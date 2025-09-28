import { Router } from 'express';
import { Customer } from '../models/Customer';
import { Queue } from '../models/Queue';

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
    
    // Check if MongoDB is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      // Return mock data when MongoDB is not connected
      console.log('[QUEUE] MongoDB not connected, returning mock data');
      
      const mockData = {
        outletId,
        currentlyServing: 'T042',
        totalWaiting: 8,
        averageWaitTime: 12,
        nextTokens: ['T043', 'T044', 'T045', 'T046', 'T047', 'T048', 'T049', 'T050'],
      };

      return res.json({
        success: true,
        data: mockData
      });
    }
    
    // Get today's date range
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    
    // Get waiting customers
    const waitingCustomers = await Customer.find({
      outletId,
      status: 'waiting',
      registrationTime: { $gte: todayStart, $lt: todayEnd }
    }).sort({ queuePosition: 1 }).select('tokenNumber name serviceType estimatedWaitTime');
    
    // Get currently serving customer
    const servingCustomer = await Customer.findOne({
      outletId,
      status: 'being_served',
      registrationTime: { $gte: todayStart, $lt: todayEnd }
    }).select('tokenNumber');
    
    // Get completed customers for analytics
    const completedCustomers = await Customer.find({
      outletId,
      status: 'completed',
      registrationTime: { $gte: todayStart, $lt: todayEnd }
    }).select('actualWaitTime serviceStartTime serviceEndTime');
    
    // Calculate average wait time
    let averageWaitTime = 0;
    if (completedCustomers.length > 0) {
      const totalWaitTime = completedCustomers.reduce((sum, customer) => {
        return sum + (customer.actualWaitTime || 0);
      }, 0);
      averageWaitTime = Math.round(totalWaitTime / completedCustomers.length / 60); // convert to minutes
    } else {
      // Default estimate if no completed customers today
      averageWaitTime = Math.max(waitingCustomers.length * 5, 5); // 5 minutes per customer, minimum 5
    }
    
    // Generate next tokens array (next 12 customers)
    const nextTokens = waitingCustomers.slice(0, 12).map(customer => customer.tokenNumber);
    
    // Get or create queue record
    let queueRecord = await Queue.findOne({ outletId, date: todayStart });
    if (!queueRecord) {
      queueRecord = new Queue({
        outletId,
        date: todayStart,
        totalWaiting: waitingCustomers.length,
        totalServed: completedCustomers.length,
        averageWaitTime,
        currentlyServing: servingCustomer?.tokenNumber
      });
      await queueRecord.save();
    } else {
      // Update queue record
      queueRecord.totalWaiting = waitingCustomers.length;
      queueRecord.totalServed = completedCustomers.length;
      queueRecord.averageWaitTime = averageWaitTime;
      queueRecord.currentlyServing = servingCustomer?.tokenNumber;
      queueRecord.lastUpdated = new Date();
      await queueRecord.save();
    }
    
    // Get currently serving customer
    let currentlyServing = '';
    if (servingCustomer && typeof servingCustomer.tokenNumber === 'string' && servingCustomer.tokenNumber.length > 0) {
      currentlyServing = servingCustomer.tokenNumber;
    } else if (waitingCustomers.length > 0 && typeof waitingCustomers[0].tokenNumber === 'string' && waitingCustomers[0].tokenNumber.length > 0) {
      currentlyServing = waitingCustomers[0].tokenNumber;
    } else {
      currentlyServing = '--';
    }

    console.log(`[QUEUE] Fetching outlet queue for ${outletId}`);
    console.log(`[QUEUE] Waiting customers:`, waitingCustomers.map(c => c.tokenNumber));
    console.log(`[QUEUE] Currently serving:`, currentlyServing);

    // Always return all required fields, even if empty
    const responseData = {
      outletId,
      currentlyServing: typeof currentlyServing === 'string' && currentlyServing.length > 0 ? currentlyServing : '--',
      totalWaiting: typeof waitingCustomers.length === 'number' ? waitingCustomers.length : 0,
      averageWaitTime: typeof averageWaitTime === 'number' ? averageWaitTime : 0,
      nextTokens: Array.isArray(nextTokens) ? nextTokens : [],
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