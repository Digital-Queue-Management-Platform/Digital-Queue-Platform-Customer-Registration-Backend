import { Router } from 'express';

const router = Router();

/**
 * @route   GET /api/services/types
 * @desc    Get all available service types
 * @access  Public
 */
router.get('/types', async (_req, res) => {
  try {
    // Always return our predefined telecommunication services
    const defaultServiceTypes = [
      {
        id: 'bill-payments',
        name: 'Bill Payments',
        estimatedTime: 8,
        category: 'Billing'
      },
      {
        id: 'technical-support',
        name: 'Technical Support & Troubleshooting',
        estimatedTime: 15,
        category: 'Support'
      },
      {
        id: 'service-disconnections',
        name: 'Service Disconnections/Reconnections',
        estimatedTime: 12,
        category: 'Service Management'
      },
      {
        id: 'international-roaming',
        name: 'International Roaming Services',
        estimatedTime: 10,
        category: 'International Services'
      },
      {
        id: 'new-connections',
        name: 'New Connections',
        estimatedTime: 20,
        category: 'Registration'
      },
      {
        id: 'device-issues',
        name: 'Device Issues/Repairs',
        estimatedTime: 15,
        category: 'Device Support'
      },
      {
        id: 'complaint-resolution',
        name: 'Complaint Resolution',
        estimatedTime: 18,
        category: 'Customer Service'
      },
      {
        id: 'corporate-account',
        name: 'Corporate Account Management',
        estimatedTime: 25,
        category: 'Corporate Services'
      },
      {
        id: 'plan-changes',
        name: 'Plan Changes/Upgrades',
        estimatedTime: 9,
        category: 'Plan Management'
      },
      {
        id: 'account-management',
        name: 'Account Management',
        estimatedTime: 12,
        category: 'Account Services'
      },
      {
        id: 'document-submission',
        name: 'Document Submission/Verification',
        estimatedTime: 6,
        category: 'Documentation'
      }
    ];

    res.json({
      success: true,
      data: defaultServiceTypes,
      totalCount: defaultServiceTypes.length
    });
  } catch (error) {
    console.error('Error fetching service types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service types',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   GET /api/services/types/:serviceId
 * @desc    Get specific service type details
 * @access  Public
 */
router.get('/types/:serviceId', (req, res) => {
  const { serviceId } = req.params;
  
  // Mock single service type
  const mockServiceType = {
    id: serviceId,
    name: 'Account Services',
    description: 'Account opening, closing, and modifications',
    estimatedDuration: 900,
    category: 'Banking',
    isActive: true,
    requirements: [
      'Valid ID',
      'Proof of address',
      'Initial deposit (for new accounts)'
    ],
    queue: {
      current: 2,
      waiting: 12,
      averageWaitTime: 1200 // 20 minutes
    },
    officers: [
      {
        id: 'OFF001',
        name: 'Officer Smith',
        specialization: 'Account Services',
        status: 'busy'
      },
      {
        id: 'OFF002',
        name: 'Officer Johnson', 
        specialization: 'Account Services',
        status: 'available'
      }
    ]
  };

  res.json({
    success: true,
    data: mockServiceType
  });
});

export default router;