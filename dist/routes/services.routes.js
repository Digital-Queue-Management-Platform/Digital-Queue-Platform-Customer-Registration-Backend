"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServiceType_1 = require("../models/ServiceType");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/services/types
 * @desc    Get all available service types
 * @access  Public
 */
router.get('/types', async (_req, res) => {
    try {
        const serviceTypes = await ServiceType_1.ServiceType.find({ isActive: true })
            .select('id name description estimatedDuration category isActive')
            .sort({ name: 1 });
        // If no service types exist, create default ones
        if (serviceTypes.length === 0) {
            const defaultServiceTypes = [
                {
                    id: 'general-inquiry',
                    name: 'General Inquiry',
                    description: 'General questions and basic information',
                    estimatedDuration: 300,
                    category: 'Information',
                    isActive: true,
                    requirements: ['Valid ID']
                },
                {
                    id: 'account-services',
                    name: 'Account Services',
                    description: 'Account opening, closing, and modifications',
                    estimatedDuration: 900,
                    category: 'Banking',
                    isActive: true,
                    requirements: ['Valid ID', 'Proof of address', 'Initial deposit']
                },
                {
                    id: 'loan-applications',
                    name: 'Loan Applications',
                    description: 'New loan applications and loan inquiries',
                    estimatedDuration: 1800,
                    category: 'Lending',
                    isActive: true,
                    requirements: ['Valid ID', 'Income proof', 'Collateral documents']
                },
                {
                    id: 'card-services',
                    name: 'Card Services',
                    description: 'Credit/debit card issues and applications',
                    estimatedDuration: 600,
                    category: 'Cards',
                    isActive: true,
                    requirements: ['Valid ID', 'Proof of address']
                },
                {
                    id: 'money-transfer',
                    name: 'Money Transfer',
                    description: 'Domestic and international money transfers',
                    estimatedDuration: 480,
                    category: 'Transfers',
                    isActive: true,
                    requirements: ['Valid ID', 'Transfer details']
                }
            ];
            await ServiceType_1.ServiceType.insertMany(defaultServiceTypes);
            const newServiceTypes = await ServiceType_1.ServiceType.find({ isActive: true })
                .select('id name description estimatedDuration category isActive')
                .sort({ name: 1 });
            return res.json({
                success: true,
                data: newServiceTypes,
                totalCount: newServiceTypes.length
            });
        }
        res.json({
            success: true,
            data: serviceTypes,
            totalCount: serviceTypes.length
        });
    }
    catch (error) {
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
exports.default = router;
//# sourceMappingURL=services.routes.js.map