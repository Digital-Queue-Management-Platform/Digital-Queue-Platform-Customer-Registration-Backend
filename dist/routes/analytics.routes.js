"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyticsController_1 = require("../controllers/analyticsController");
const router = (0, express_1.Router)();
const analyticsController = new analyticsController_1.AnalyticsController();
/**
 * @route   GET /api/analytics/dashboard
 * @desc    Get comprehensive analytics dashboard data
 * @access  Public (should be protected in production)
 * @query   outletId?: string, startDate?: string, endDate?: string
 */
router.get('/dashboard', analyticsController.getDashboard);
/**
 * @route   GET /api/analytics/wait-times
 * @desc    Get wait time analytics by hour
 * @access  Public
 * @query   outletId?: string
 */
router.get('/wait-times', analyticsController.getWaitTimes);
/**
 * @route   GET /api/analytics/service-types
 * @desc    Get service type distribution and analytics
 * @access  Public
 * @query   outletId?: string
 */
router.get('/service-types', analyticsController.getServiceTypes);
/**
 * @route   GET /api/analytics/officer-performance
 * @desc    Get officer performance analytics
 * @access  Public
 * @query   outletId?: string
 */
router.get('/officer-performance', analyticsController.getOfficerPerformance);
/**
 * @route   GET /api/analytics/outlet-comparison
 * @desc    Get comparison analytics between outlets
 * @access  Public
 */
router.get('/outlet-comparison', analyticsController.getOutletComparison);
/**
 * @route   GET /api/analytics/customer-trends
 * @desc    Get customer trends over time
 * @access  Public
 * @query   outletId?: string
 */
router.get('/customer-trends', analyticsController.getCustomerTrends);
/**
 * @route   POST /api/analytics/generate-report
 * @desc    Generate and save a comprehensive report
 * @access  Public (should be protected in production)
 * @body    outletId?: string, reportType: string, dateRange: object
 */
router.post('/generate-report', analyticsController.generateReport);
/**
 * @route   GET /api/analytics/reports
 * @desc    Get saved analytics reports
 * @access  Public
 * @query   outletId?: string, type?: string, startDate?: string, endDate?: string
 */
router.get('/reports', analyticsController.getReports);
/**
 * @route   GET /api/analytics/real-time
 * @desc    Get real-time analytics metrics
 * @access  Public
 * @query   outletId?: string
 */
router.get('/real-time', analyticsController.getRealTimeMetrics);
/**
 * @route   GET /api/analytics/peak-hours
 * @desc    Get peak hours analysis
 * @access  Public
 * @query   outletId?: string
 */
router.get('/peak-hours', analyticsController.getPeakHoursAnalysis);
exports.default = router;
//# sourceMappingURL=analytics.routes.js.map