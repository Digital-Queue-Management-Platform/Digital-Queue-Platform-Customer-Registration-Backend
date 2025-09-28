import { Router } from 'express';
import { Customer } from '../models/Customer';
import { Queue } from '../models/Queue';

const router = Router();

// Helper function to generate token number
const generateTokenNumber = async (outletId: string): Promise<string> => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const count = await Customer.countDocuments({
    outletId,
    registrationTime: { $gte: todayStart }
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
    const { name, email, phoneNumber, serviceType, outletId } = req.body;
    
    // Validate required fields
    if (!name || !phoneNumber || !serviceType || !outletId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, phoneNumber, serviceType, outletId'
      });
    }

    // Get today's date range for duplicate checking
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    // Check for duplicate registrations today (same phone number)
    const existingCustomer = await Customer.findOne({
      phoneNumber: phoneNumber.trim(),
      outletId,
      registrationTime: { $gte: todayStart, $lt: todayEnd }
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
    const currentPosition = await Customer.countDocuments({
      outletId,
      status: 'waiting'
    }) + 1;
    
    // Estimate wait time (5 minutes per person ahead + service time)
    const estimatedWaitTime = Math.max((currentPosition - 1) * 300 + 600, 300); // minimum 5 minutes
    
    // Create new customer
    const customer = new Customer({
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email?.trim(),
      serviceType,
      outletId,
      tokenNumber,
      queuePosition: currentPosition,
      estimatedWaitTime,
      status: 'waiting',
      registrationTime: new Date()
    });
    
    await customer.save();
    
    // Update queue statistics
    const queueUpdateDate = new Date();
    const queueTodayStart = new Date(queueUpdateDate.getFullYear(), queueUpdateDate.getMonth(), queueUpdateDate.getDate());
    
    await Queue.findOneAndUpdate(
      { outletId, date: queueTodayStart },
      { 
        $inc: { totalWaiting: 1 },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true, new: true }
    );

    // Return customer data in expected format
    const responseData = {
      id: customer._id.toString(),
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
      serviceType: customer.serviceType,
      outletId: customer.outletId,
      tokenNumber: customer.tokenNumber,
      queuePosition: customer.queuePosition,
      estimatedWaitTime: customer.estimatedWaitTime,
      status: customer.status,
      createdAt: customer.registrationTime.toISOString()
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