"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Outlet management routes
/**
 * @route   GET /api/outlets/list
 * @desc    Get all active outlets
 * @access  Public
 */
router.get('/list', (_req, res) => {
    // Mock data for development
    const mockOutlets = [
        {
            _id: '670f8b5c123456789abcdef0',
            name: 'Main Branch',
            location: 'Downtown',
            address: '123 Main St, City Center',
            capacity: 50,
            serviceTypes: ['General Inquiry', 'Account Services', 'Loan Applications', 'Card Services'],
            isActive: true,
            operatingHours: {
                open: '09:00',
                close: '17:00',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
            }
        },
        {
            _id: '670f8b5c123456789abcdef1',
            name: 'North Branch',
            location: 'Northside',
            address: '456 North Ave, North District',
            capacity: 30,
            serviceTypes: ['General Inquiry', 'Account Services', 'Money Transfer'],
            isActive: true,
            operatingHours: {
                open: '08:30',
                close: '16:30',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            }
        }
    ];
    res.json({
        success: true,
        data: mockOutlets,
    });
});
/**
 * @route   GET /api/outlets/:outletId
 * @desc    Get outlet by ID
 * @access  Public
 */
router.get('/:outletId', (req, res) => {
    const { outletId } = req.params;
    // Mock data for development
    const mockOutlet = {
        _id: outletId,
        name: 'Main Branch',
        location: 'Downtown',
        address: '123 Main St, City Center',
        capacity: 50,
        serviceTypes: ['General Inquiry', 'Account Services', 'Loan Applications', 'Card Services'],
        isActive: true,
        operatingHours: {
            open: '09:00',
            close: '17:00',
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        }
    };
    res.json({
        success: true,
        data: mockOutlet,
    });
});
/**
 * @route   GET /api/outlets/:outletId/statistics
 * @desc    Get outlet statistics
 * @access  Public
 */
router.get('/:outletId/statistics', (_req, res) => {
    // Mock statistics data
    const mockStats = {
        totalCustomers: 150,
        averageWaitTime: 900, // 15 minutes in seconds
        averageServiceTime: 600, // 10 minutes in seconds
        peakHours: [
            { hour: 9, count: 25 },
            { hour: 10, count: 30 },
            { hour: 11, count: 28 },
            { hour: 14, count: 32 },
            { hour: 15, count: 35 }
        ],
        serviceDistribution: [
            { type: 'General Inquiry', count: 45 },
            { type: 'Account Services', count: 38 },
            { type: 'Loan Applications', count: 42 },
            { type: 'Card Services', count: 25 }
        ],
        customerSatisfaction: 4.2,
        officerUtilization: [
            { officerId: 'OFF001', utilization: 85 },
            { officerId: 'OFF002', utilization: 92 },
            { officerId: 'OFF003', utilization: 78 }
        ]
    };
    res.json({
        success: true,
        data: mockStats,
    });
});
exports.default = router;
//# sourceMappingURL=outlet.routes.js.map