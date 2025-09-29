import { Router } from 'express';
import { ServiceType } from '../models/ServiceType';

const router = Router();

/**
 * @route   GET /api/services/types
 * @desc    Get all available service types
 * @access  Public
 */
router.get('/types', async (_req, res) => {
  try {
    const serviceTypes = await ServiceType.find({ isActive: true })
      .select('id name description estimatedDuration category isActive')
      .sort({ name: 1 });

    // If no service types exist, create default ones
    if (serviceTypes.length === 0) {
      const defaultServiceTypes = [
        {
          id: 'bill-payments',
          name: 'Bill Payments',
          description: 'Handle customer bill payments and inquiries',
          estimatedDuration: 480, // 8 minutes
          category: 'Billing',
          isActive: true,
          requirements: ['Valid ID', 'Account number']
        },
        {
          id: 'technical-support',
          name: 'Technical Support & Troubleshooting',
          description: 'Resolve technical issues',
          estimatedDuration: 900, // 15 minutes
          category: 'Support',
          isActive: true,
          requirements: ['Valid ID', 'Device information']
        },
        {
          id: 'service-disconnections',
          name: 'Service Disconnections/Reconnections',
          description: 'Process service changes',
          estimatedDuration: 720, // 12 minutes
          category: 'Service Management',
          isActive: true,
          requirements: ['Valid ID', 'Account verification']
        },
        {
          id: 'international-roaming',
          name: 'International Roaming Services',
          description: 'Setup and manage roaming services',
          estimatedDuration: 600, // 10 minutes
          category: 'International Services',
          isActive: true,
          requirements: ['Valid ID', 'Passport', 'Travel details']
        },
        {
          id: 'new-connections',
          name: 'New Connections',
          description: 'Mobile/fixed line/broadband registration',
          estimatedDuration: 1200, // 20 minutes
          category: 'Registration',
          isActive: true,
          requirements: ['Valid ID', 'Proof of address', 'Initial payment']
        },
        {
          id: 'device-issues',
          name: 'Device Issues/Repairs',
          description: 'Handle device-related problems and repairs',
          estimatedDuration: 900, // 15 minutes
          category: 'Device Support',
          isActive: true,
          requirements: ['Valid ID', 'Device', 'Purchase receipt']
        },
        {
          id: 'complaint-resolution',
          name: 'Complaint Resolution',
          description: 'Handle and resolve customer complaints',
          estimatedDuration: 1080, // 18 minutes
          category: 'Customer Service',
          isActive: true,
          requirements: ['Valid ID', 'Complaint reference']
        },
        {
          id: 'corporate-account',
          name: 'Corporate Account Management',
          description: 'Handle business accounts',
          estimatedDuration: 1500, // 25 minutes
          category: 'Corporate Services',
          isActive: true,
          requirements: ['Valid ID', 'Business registration', 'Authorization letter']
        },
        {
          id: 'plan-changes',
          name: 'Plan Changes/Upgrades',
          description: 'Help customers change or upgrade their plans',
          estimatedDuration: 540, // 9 minutes
          category: 'Plan Management',
          isActive: true,
          requirements: ['Valid ID', 'Current plan details']
        },
        {
          id: 'account-management',
          name: 'Account Management',
          description: 'Address changes, name transfers, etc.',
          estimatedDuration: 720, // 12 minutes
          category: 'Account Services',
          isActive: true,
          requirements: ['Valid ID', 'Proof of new details']
        },
        {
          id: 'document-submission',
          name: 'Document Submission/Verification',
          description: 'Process customer documents',
          estimatedDuration: 360, // 6 minutes
          category: 'Documentation',
          isActive: true,
          requirements: ['Valid ID', 'Required documents']
        }
      ];

      await ServiceType.insertMany(defaultServiceTypes);
      const newServiceTypes = await ServiceType.find({ isActive: true })
        .select('id name description estimatedDuration category isActive')
        .sort({ name: 1 });

      // Transform data to match frontend expectations
      const transformedNewTypes = newServiceTypes.map(service => ({
        id: service.id,
        name: service.name,
        estimatedTime: Math.round(service.estimatedDuration / 60), // Convert seconds to minutes
        category: service.category
      }));

      return res.json({
        success: true,
        data: transformedNewTypes,
        totalCount: transformedNewTypes.length
      });
    }

    // Transform data to match frontend expectations
    const transformedTypes = serviceTypes.map(service => ({
      id: service.id,
      name: service.name,
      estimatedTime: Math.round(service.estimatedDuration / 60), // Convert seconds to minutes
      category: service.category
    }));

    res.json({
      success: true,
      data: transformedTypes,
      totalCount: transformedTypes.length
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