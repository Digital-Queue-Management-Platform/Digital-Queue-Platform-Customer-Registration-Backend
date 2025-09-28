"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analyticsService_1 = require("../services/analyticsService");
class AnalyticsController {
    constructor() {
        /**
         * Get comprehensive analytics dashboard data
         */
        this.getDashboard = async (req, res) => {
            try {
                const { outletId, startDate, endDate } = req.query;
                // Check if MongoDB is connected - require real connection for real data
                const mongoose = require('mongoose');
                if (mongoose.connection.readyState !== 1) {
                    console.error('[ANALYTICS] MongoDB not connected - cannot fetch real analytics data');
                    return res.status(503).json({
                        success: false,
                        message: 'Database connection unavailable. Please ensure MongoDB Atlas is connected for real analytics data.',
                        error: 'Service temporarily unavailable'
                    });
                }
                const dateRange = {
                    start: startDate ? new Date(startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    end: endDate ? new Date(endDate) : new Date(),
                };
                const dashboardData = await this.analyticsService.getDashboardAnalytics({
                    outletId,
                    dateRange,
                });
                // Map the data to match frontend expectations
                const mappedData = {
                    averageWaitTime: dashboardData.averageWaitTime,
                    totalCustomersToday: dashboardData.totalCustomers,
                    completedServices: dashboardData.totalCustomers, // Assuming all customers are completed for simplicity
                    peakHours: dashboardData.peakHours,
                    serviceTypeBreakdown: dashboardData.serviceDistribution.map(item => ({
                        type: item.type,
                        count: item.count
                    })),
                };
                res.json({
                    success: true,
                    data: mappedData,
                });
            }
            catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Return error instead of mock data to ensure real data requirement
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch real analytics data from database',
                    error: error instanceof Error ? error.message : 'Unknown database error'
                });
            }
        };
        /**
         * Get wait time analytics
         */
        this.getWaitTimes = async (req, res) => {
            try {
                const { outletId } = req.query;
                // Check if MongoDB is connected - require real connection for real data
                const mongoose = require('mongoose');
                if (mongoose.connection.readyState !== 1) {
                    return res.status(503).json({
                        success: false,
                        message: 'Database connection unavailable. Cannot fetch real wait time data.',
                        error: 'Service temporarily unavailable'
                    });
                }
                const waitTimeData = await this.analyticsService.getWaitTimeAnalytics(outletId);
                res.json({
                    success: true,
                    data: waitTimeData,
                });
            }
            catch (error) {
                console.error('Error fetching wait time data:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch real wait time data from database',
                    error: error instanceof Error ? error.message : 'Unknown database error'
                });
            }
        };
        /**
         * Get service type distribution analytics
         */
        this.getServiceTypes = async (req, res) => {
            try {
                const { outletId } = req.query;
                const serviceTypeData = await this.analyticsService.getServiceTypeAnalytics(outletId);
                res.json({
                    success: true,
                    data: serviceTypeData,
                });
            }
            catch (error) {
                console.error('Error fetching service type data:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch service type data',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
        /**
         * Get officer performance analytics
         */
        this.getOfficerPerformance = async (req, res) => {
            try {
                const { outletId } = req.query;
                // Check if MongoDB is connected - require real connection for real data
                const mongoose = require('mongoose');
                if (mongoose.connection.readyState !== 1) {
                    return res.status(503).json({
                        success: false,
                        message: 'Database connection unavailable. Cannot fetch real officer performance data.',
                        error: 'Service temporarily unavailable'
                    });
                }
                const performanceData = await this.analyticsService.getOfficerPerformanceAnalytics(outletId);
                res.json({
                    success: true,
                    data: performanceData,
                });
            }
            catch (error) {
                console.error('Error fetching officer performance data:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch officer performance data',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
        /**
         * Get outlet comparison analytics
         */
        this.getOutletComparison = async (_req, res) => {
            try {
                const comparisonData = await this.analyticsService.getOutletComparisonAnalytics();
                res.json({
                    success: true,
                    data: comparisonData,
                });
            }
            catch (error) {
                console.error('Error fetching outlet comparison data:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch outlet comparison data',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
        /**
         * Get customer trends analytics
         */
        this.getCustomerTrends = async (req, res) => {
            try {
                const { outletId } = req.query;
                const trendsData = await this.analyticsService.getCustomerTrendsAnalytics(outletId);
                res.json({
                    success: true,
                    data: trendsData,
                });
            }
            catch (error) {
                console.error('Error fetching customer trends data:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch customer trends data',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
        /**
         * Generate and save analytics report
         */
        this.generateReport = async (req, res) => {
            try {
                const { outletId, reportType, dateRange } = req.body;
                if (!reportType || !dateRange) {
                    res.status(400).json({
                        success: false,
                        message: 'Report type and date range are required',
                    });
                    return;
                }
                const report = await this.analyticsService.generateReport({
                    outletId,
                    reportType,
                    dateRange: {
                        start: new Date(dateRange.start),
                        end: new Date(dateRange.end),
                    },
                });
                res.json({
                    success: true,
                    data: report,
                });
            }
            catch (error) {
                console.error('Error generating report:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to generate report',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
        /**
         * Get saved reports
         */
        this.getReports = async (req, res) => {
            try {
                const { outletId, type, startDate, endDate } = req.query;
                const reports = await this.analyticsService.getReports({
                    outletId,
                    type,
                    dateRange: startDate && endDate ? {
                        start: new Date(startDate),
                        end: new Date(endDate),
                    } : undefined,
                });
                res.json({
                    success: true,
                    data: reports,
                });
            }
            catch (error) {
                console.error('Error fetching reports:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch reports',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
        /**
         * Get real-time analytics metrics
         */
        this.getRealTimeMetrics = async (req, res) => {
            try {
                const { outletId } = req.query;
                const metrics = await this.analyticsService.getRealTimeMetrics(outletId);
                res.json({
                    success: true,
                    data: metrics,
                });
            }
            catch (error) {
                console.error('Error fetching real-time metrics:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch real-time metrics',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
        /**
         * Get peak hours analysis
         */
        this.getPeakHoursAnalysis = async (req, res) => {
            try {
                const { outletId } = req.query;
                const peakHours = await this.analyticsService.getPeakHoursAnalysis(outletId);
                res.json({
                    success: true,
                    data: peakHours,
                });
            }
            catch (error) {
                console.error('Error fetching peak hours analysis:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch peak hours analysis',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
        this.analyticsService = new analyticsService_1.AnalyticsService();
    }
}
exports.AnalyticsController = AnalyticsController;
//# sourceMappingURL=analyticsController.js.map