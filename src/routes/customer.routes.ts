import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

// Helper function to generate token number
const generateTokenNumber = async (outletId: string): Promise<string> => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const count = await prisma.customer.count({
    where: {
      outletId,
      registrationTime: { gte: todayStart }
    }
  });
  
  return `T${(count + 1).toString().padStart(3, '0')}`;
};

/**
 * @route   POST /api/customer/register
 * @desc    Register a new customer and generate token
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    console.log('[REGISTER] Full request body:', JSON.stringify(req.body, null, 2));
    
    const { name, email, phoneNumber, telephoneNumber, mobileNumber, serviceType, outletId, nicPassport } = req.body;
    
    // Use phoneNumber or fallback to telephoneNumber/mobileNumber for compatibility
    const customerPhone = phoneNumber || telephoneNumber || mobileNumber;
    
    console.log('[REGISTER] Extracted fields:', {
      name, 
      customerPhone,
      serviceType, 
      outletId,
      email,
      nicPassport
    });
    
    // Validate required fields
    if (!name || !customerPhone || !serviceType || !outletId) {
      console.log('[REGISTER] Missing required fields:', { name: !!name, customerPhone: !!customerPhone, serviceType: !!serviceType, outletId: !!outletId });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, phone number, serviceType, outletId'
      });
    }

    // Get today's date range for duplicate checking
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    // Check for duplicate registrations today (same phone number)
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        phoneNumber: customerPhone.trim(),
        outletId,
        registrationTime: { 
          gte: todayStart, 
          lt: todayEnd 
        }
      }
    });

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: `You are already registered today with token ${existingCustomer.tokenNumber}. Please check your queue status.`,
        data: {
          existingToken: existingCustomer.tokenNumber,
          queuePosition: existingCustomer.queuePosition,
          status: existingCustomer.status
        }
      });
    }
    
    // Generate token number
    const tokenNumber = await generateTokenNumber(outletId);
    
    // Get current queue position
    const currentPosition = await prisma.customer.count({
      where: {
        outletId,
        status: 'WAITING'
      }
    }) + 1;
    
    // Estimate wait time (5 minutes per person ahead + service time)
    const estimatedWaitTime = Math.max((currentPosition - 1) * 5 + 10, 5); // minimum 5 minutes
    
    // Create new customer
    console.log('[REGISTER] About to create customer with data:', {
      name: name.trim(),
      phoneNumber: customerPhone.trim(),
      email: email?.trim(),
      serviceType,
      outletId,
      tokenNumber,
      queuePosition: currentPosition,
      estimatedWaitTime,
      status: 'WAITING',
      priority: 'NORMAL'
    });
    
    const customer = await prisma.customer.create({
      data: {
        name: name.trim(),
        phoneNumber: customerPhone.trim(),
        email: email?.trim(),
        serviceType,
        outletId,
        tokenNumber,
        queuePosition: currentPosition,
        estimatedWaitTime,
        status: 'WAITING',
        priority: 'NORMAL',
        qrCode: `QR_${tokenNumber}_${Date.now()}`
      }
    });
    

    
    // Return customer data in expected format
    const responseData = {
      id: customer.id,
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
      serviceType: customer.serviceType,
      outletId: customer.outletId,
      tokenNumber: customer.tokenNumber,
      queuePosition: customer.queuePosition,
      estimatedWaitTime: customer.estimatedWaitTime,
      status: customer.status,
      createdAt: customer.registrationTime.toISOString(),
      qrCode: customer.qrCode
    };

    console.log(`[REGISTER] New customer registration:`, { name, phoneNumber, serviceType, outletId });
    
    res.status(201).json({
      success: true,
      data: responseData,
      message: 'Customer registered successfully'
    });
  } catch (error) {
    console.error('Customer registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register customer',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   GET /api/customer/status/:tokenId
 * @desc    Get customer status by token ID
 * @access  Public
 */
router.get('/status/:tokenId', (req, res) => {
  const { tokenId } = req.params;
  
  // Mock customer status
  const mockCustomer = {
    id: tokenId,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    serviceType: 'Account Services',
    outletId: 'outlet-001',
    tokenNumber: 'T123',
    queuePosition: Math.floor(Math.random() * 5) + 1,
    estimatedWaitTime: (Math.floor(Math.random() * 15) + 5) * 60,
    status: 'waiting' as const,
    createdAt: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
  };

  res.json({
    success: true,
    data: mockCustomer
  });
});

export default router;