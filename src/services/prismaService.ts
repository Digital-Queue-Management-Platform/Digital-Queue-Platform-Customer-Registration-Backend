/**
 * Example Prisma Client Usage
 * 
 * This file shows how to replace Mongoose operations with Prisma
 * in your existing Digital Queue Management Platform.
 */

import { PrismaClient, CustomerStatus, CustomerPriority } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================================================
// CUSTOMER OPERATIONS (replacing Mongoose Customer model)
// ============================================================================

/**
 * Create a new customer registration
 */
export async function createCustomer(customerData: {
  name: string;
  phoneNumber: string;
  email?: string;
  serviceType: string;
  outletId: string;
  priority?: CustomerPriority;
}) {
  const tokenNumber = `A${Date.now().toString().slice(-3)}`;
  const queuePosition = await getNextQueuePosition(customerData.outletId);
  
  const customer = await prisma.customer.create({
    data: {
      ...customerData,
      tokenNumber,
      queuePosition,
      priority: customerData.priority || 'NORMAL',
      status: 'WAITING',
      estimatedWaitTime: calculateEstimatedWaitTime(queuePosition),
      qrCode: `QR_${tokenNumber}_${Date.now()}`,
    },
    include: {
      outlet: true,
      assignedOfficer: true,
    },
  });

  return customer;
}

/**
 * Get customer by token number
 */
export async function getCustomerByToken(tokenNumber: string) {
  return await prisma.customer.findUnique({
    where: { tokenNumber },
    include: {
      outlet: true,
      assignedOfficer: true,
    },
  });
}

/**
 * Update customer status
 */
export async function updateCustomerStatus(
  customerId: string, 
  status: CustomerStatus,
  officerId?: string
) {
  const updateData: any = { status };
  
  if (status === 'BEING_SERVED') {
    updateData.serviceStartTime = new Date();
    updateData.assignedOfficerId = officerId;
  } else if (status === 'COMPLETED') {
    updateData.serviceEndTime = new Date();
  }

  return await prisma.customer.update({
    where: { id: customerId },
    data: updateData,
    include: {
      outlet: true,
      assignedOfficer: true,
    },
  });
}

/**
 * Get waiting queue for an outlet
 */
export async function getWaitingQueue(outletId: string) {
  return await prisma.customer.findMany({
    where: {
      outletId,
      status: 'WAITING',
    },
    orderBy: [
      { priority: 'desc' }, // VIP, SENIOR, DISABLED first
      { registrationTime: 'asc' }, // Then by registration time
    ],
    include: {
      outlet: true,
    },
  });
}

// ============================================================================
// SERVICE TYPE OPERATIONS
// ============================================================================

/**
 * Create a new service type
 */
export async function createServiceType(serviceData: {
  serviceId: string;
  name: string;
  description: string;
  estimatedDuration: number; // in seconds
  category: string;
  requirements?: string[];
}) {
  return await prisma.serviceType.create({
    data: {
      ...serviceData,
      requirements: serviceData.requirements || [],
    },
  });
}

/**
 * Get all active service types
 */
export async function getActiveServiceTypes() {
  return await prisma.serviceType.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
}

// ============================================================================
// OUTLET OPERATIONS
// ============================================================================

/**
 * Create a new outlet
 */
export async function createOutlet(outletData: {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  email?: string;
  operatingHours?: any;
}) {
  return await prisma.outlet.create({
    data: outletData,
  });
}

/**
 * Get outlet statistics
 */
export async function getOutletStatistics(outletId: string) {
  const [
    totalCustomers,
    waitingCustomers,
    beingServedCustomers,
    completedToday,
  ] = await Promise.all([
    prisma.customer.count({
      where: { outletId }
    }),
    prisma.customer.count({
      where: { outletId, status: 'WAITING' }
    }),
    prisma.customer.count({
      where: { outletId, status: 'BEING_SERVED' }
    }),
    prisma.customer.count({
      where: {
        outletId,
        status: 'COMPLETED',
        registrationTime: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    }),
  ]);

  return {
    totalCustomers,
    waitingCustomers,
    beingServedCustomers,
    completedToday,
  };
}

// ============================================================================
// ANALYTICS OPERATIONS
// ============================================================================

/**
 * Get daily analytics
 */
export async function getDailyAnalytics(date: Date = new Date()) {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const customers = await prisma.customer.findMany({
    where: {
      registrationTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      outlet: true,
    },
  });

  const analytics = {
    totalRegistrations: customers.length,
    completedServices: customers.filter(c => c.status === 'COMPLETED').length,
    averageWaitTime: 0,
    servicesByOutlet: {} as Record<string, number>,
    servicesByType: {} as Record<string, number>,
  };

  // Calculate average wait time
  const completedWithWaitTime = customers.filter(c => c.actualWaitTime !== null);
  if (completedWithWaitTime.length > 0) {
    analytics.averageWaitTime = completedWithWaitTime.reduce(
      (sum, c) => sum + (c.actualWaitTime || 0), 0
    ) / completedWithWaitTime.length;
  }

  // Group by outlet
  customers.forEach(customer => {
    const outletName = customer.outlet.name;
    analytics.servicesByOutlet[outletName] = (analytics.servicesByOutlet[outletName] || 0) + 1;
  });

  // Group by service type
  customers.forEach(customer => {
    analytics.servicesByType[customer.serviceType] = (analytics.servicesByType[customer.serviceType] || 0) + 1;
  });

  return analytics;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function getNextQueuePosition(outletId: string): Promise<number> {
  const lastCustomer = await prisma.customer.findFirst({
    where: { outletId },
    orderBy: { queuePosition: 'desc' },
  });
  
  return (lastCustomer?.queuePosition || 0) + 1;
}

function calculateEstimatedWaitTime(queuePosition: number): number {
  // Assume 15 minutes average service time
  return queuePosition * 15;
}

// ============================================================================
// EXAMPLE USAGE IN EXPRESS CONTROLLER
// ============================================================================

/*
// In your customer.routes.ts or controller file:

import express from 'express';
import { createCustomer, getWaitingQueue } from './prisma-examples';

const router = express.Router();

// Register a new customer
router.post('/register', async (req, res) => {
  try {
    const customer = await createCustomer({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      serviceType: req.body.serviceType,
      outletId: req.body.outletId,
      priority: req.body.priority,
    });
    
    res.status(201).json({
      success: true,
      data: customer,
      message: 'Customer registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to register customer',
      error: error.message
    });
  }
});

// Get queue status
router.get('/queue/:outletId', async (req, res) => {
  try {
    const queue = await getWaitingQueue(req.params.outletId);
    
    res.json({
      success: true,
      data: queue,
      count: queue.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get queue',
      error: error.message
    });
  }
});

export default router;
*/

// ============================================================================
// DATABASE CONNECTION MANAGEMENT
// ============================================================================

/**
 * Graceful shutdown
 */
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;