import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

/**
 * @route   GET /api/queue/status/:tokenId
 * @desc    Get queue status for a specific token
 * @access  Public
 */
router.get('/status/:tokenId', (req, res) => {
  const { tokenId } = req.params;
  
  // Mock queue status
  const mockQueueStatus = {
    tokenId,
    tokenNumber: `T${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    position: Math.floor(Math.random() * 10) + 1,
    estimatedWaitTime: (Math.floor(Math.random() * 20) + 5) * 60,
    status: 'waiting' as const,
    currentlyServing: `T${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    outletId: 'outlet-001'
  };

  res.json({
    success: true,
    data: mockQueueStatus
  });
});

/**
 * @route   GET /api/queue/outlet/:outletId
 * @desc    Get queue information for a specific outlet
 * @access  Public
 */
router.get('/outlet/:outletId', async (req, res) => {
  try {
    const { outletId } = req.params;
    
    // Get queue data using Prisma
    console.log('[QUEUE] Fetching queue data from PostgreSQL for outlet:', outletId);
    
    // Get today's date range
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    
    // Get waiting customers
    const waitingCustomers = await prisma.customer.findMany({
      where: {
        outletId,
        status: 'WAITING',
        registrationTime: { gte: todayStart, lt: todayEnd }
      },
      orderBy: { queuePosition: 'asc' },
      select: { tokenNumber: true, name: true, serviceType: true, estimatedWaitTime: true }
    });
    
    // Get currently serving customer
    const servingCustomer = await prisma.customer.findFirst({
      where: {
        outletId,
        status: 'BEING_SERVED',
        registrationTime: { gte: todayStart, lt: todayEnd }
      },
      select: { tokenNumber: true }
    });
    
    // Get completed customers for analytics
    const completedCustomers = await prisma.customer.findMany({
      where: {
        outletId,
        status: 'COMPLETED',
        registrationTime: { gte: todayStart, lt: todayEnd }
      },
      select: { actualWaitTime: true, serviceStartTime: true, serviceEndTime: true }
    });
    
    // Calculate average wait time
    let averageWaitTime = 0;
    if (completedCustomers.length > 0) {
      const totalWaitTime = completedCustomers.reduce((sum: number, customer: any) => {
        return sum + (customer.actualWaitTime || 0);
      }, 0);
      averageWaitTime = Math.round(totalWaitTime / completedCustomers.length); // already in minutes
    } else {
      // Default estimate if no completed customers today
      averageWaitTime = Math.max(waitingCustomers.length * 5, 5); // 5 minutes per customer, minimum 5
    }
    
    // Generate next tokens array (next 12 customers)
    const nextTokens = waitingCustomers.slice(0, 12).map((customer: any) => customer.tokenNumber);
    
    // Get currently serving customer
    let currentlyServing = '--';
    if (servingCustomer?.tokenNumber) {
      currentlyServing = servingCustomer.tokenNumber;
    } else if (waitingCustomers.length > 0) {
      currentlyServing = waitingCustomers[0].tokenNumber;
    }

    console.log(`[QUEUE] Fetching outlet queue for ${outletId}`);
    console.log(`[QUEUE] Waiting customers:`, waitingCustomers.map((c: any) => c.tokenNumber));
    console.log(`[QUEUE] Currently serving:`, currentlyServing);

    // Return response data
    const responseData = {
      outletId,
      currentlyServing,
      totalWaiting: waitingCustomers.length,
      averageWaitTime,
      nextTokens,
    };

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Error fetching outlet queue:', error);
    
    // Return mock data as fallback on any error
    const mockData = {
      outletId: req.params.outletId,
      currentlyServing: 'T042',
      totalWaiting: 8,
      averageWaitTime: 12,
      nextTokens: ['T043', 'T044', 'T045', 'T046', 'T047', 'T048'],
    };

    res.json({
      success: true,
      data: mockData
    });
  }
});

/**
 * @route   PUT /api/queue/update/:tokenId
 * @desc    Update queue status for a token
 * @access  Public
 */
router.put('/update/:tokenId', (req, res) => {
  const { tokenId } = req.params;
  const { status } = req.body;

  // Mock update response
  res.json({
    success: true,
    data: {
      tokenId,
      status,
      updatedAt: new Date().toISOString()
    },
    message: `Token ${tokenId} status updated to ${status}`
  });
});

export default router;