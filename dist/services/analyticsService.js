"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Customer_1 = require("../models/Customer");
const Officer_1 = require("../models/Officer");
const Outlet_1 = require("../models/Outlet");
class AnalyticsService {
    /**
     * Get comprehensive dashboard analytics
     */
    async getDashboardAnalytics(filters) {
        const matchStage = {};
        if (filters.outletId) {
            matchStage.outletId = new mongoose_1.default.Types.ObjectId(filters.outletId);
        }
        if (filters.dateRange) {
            matchStage.registrationTime = {
                $gte: filters.dateRange.start,
                $lte: filters.dateRange.end,
            };
        }
        // Get total customers
        const totalCustomers = await Customer_1.Customer.countDocuments(matchStage);
        // Get average wait time
        const waitTimeAggregation = await Customer_1.Customer.aggregate([
            { $match: { ...matchStage, actualWaitTime: { $exists: true } } },
            {
                $group: {
                    _id: null,
                    averageWaitTime: { $avg: '$actualWaitTime' },
                },
            },
        ]);
        // Get average service time
        const serviceTimeAggregation = await Customer_1.Customer.aggregate([
            {
                $match: {
                    ...matchStage,
                    serviceStartTime: { $exists: true },
                    serviceEndTime: { $exists: true }
                }
            },
            {
                $project: {
                    serviceTime: {
                        $divide: [
                            { $subtract: ['$serviceEndTime', '$serviceStartTime'] },
                            1000 * 60 // Convert to minutes
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    averageServiceTime: { $avg: '$serviceTime' },
                },
            },
        ]);
        // Get peak hours
        const peakHours = await Customer_1.Customer.aggregate([
            { $match: matchStage },
            {
                $project: {
                    hour: { $hour: '$registrationTime' },
                },
            },
            {
                $group: {
                    _id: '$hour',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    hour: '$_id',
                    count: 1,
                    _id: 0,
                },
            },
            { $sort: { hour: 1 } },
        ]);
        // Get service distribution
        const serviceDistribution = await Customer_1.Customer.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$serviceType',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    type: '$_id',
                    count: 1,
                    _id: 0,
                },
            },
            { $sort: { count: -1 } },
        ]);
        // Get customer satisfaction
        const satisfactionAggregation = await Customer_1.Customer.aggregate([
            {
                $match: {
                    ...matchStage,
                    'feedback.rating': { $exists: true }
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$feedback.rating' },
                },
            },
        ]);
        // Get officer utilization
        const officerUtilization = await this.getOfficerUtilizationData(filters.outletId);
        return {
            totalCustomers,
            averageWaitTime: waitTimeAggregation[0]?.averageWaitTime || 0,
            averageServiceTime: serviceTimeAggregation[0]?.averageServiceTime || 0,
            peakHours,
            serviceDistribution,
            customerSatisfaction: satisfactionAggregation[0]?.averageRating || 0,
            officerUtilization,
        };
    }
    /**
     * Get wait time analytics by hour
     */
    async getWaitTimeAnalytics(outletId) {
        const matchStage = { actualWaitTime: { $exists: true } };
        if (outletId) {
            matchStage.outletId = new mongoose_1.default.Types.ObjectId(outletId);
        }
        const waitTimeByHour = await Customer_1.Customer.aggregate([
            { $match: matchStage },
            {
                $project: {
                    hour: { $hour: '$registrationTime' },
                    waitTime: '$actualWaitTime',
                },
            },
            {
                $group: {
                    _id: '$hour',
                    avgWaitTime: { $avg: '$waitTime' },
                },
            },
            {
                $project: {
                    hour: '$_id',
                    avgWaitTime: { $divide: ['$avgWaitTime', 60] }, // Convert to minutes
                    _id: 0,
                },
            },
            { $sort: { hour: 1 } },
        ]);
        return waitTimeByHour;
    }
    /**
     * Get service type analytics
     */
    async getServiceTypeAnalytics(outletId) {
        const matchStage = {};
        if (outletId) {
            matchStage.outletId = new mongoose_1.default.Types.ObjectId(outletId);
        }
        const serviceTypeAnalytics = await Customer_1.Customer.aggregate([
            { $match: matchStage },
            {
                $project: {
                    serviceType: 1,
                    serviceTime: {
                        $cond: {
                            if: {
                                $and: [
                                    { $ne: ['$serviceStartTime', null] },
                                    { $ne: ['$serviceEndTime', null] }
                                ]
                            },
                            then: {
                                $divide: [
                                    { $subtract: ['$serviceEndTime', '$serviceStartTime'] },
                                    1000 * 60 // Convert to minutes
                                ]
                            },
                            else: null
                        }
                    }
                },
            },
            {
                $group: {
                    _id: '$serviceType',
                    count: { $sum: 1 },
                    avgTime: { $avg: '$serviceTime' },
                },
            },
            {
                $project: {
                    type: '$_id',
                    count: 1,
                    avgTime: { $ifNull: ['$avgTime', 0] },
                    _id: 0,
                },
            },
            { $sort: { count: -1 } },
        ]);
        return serviceTypeAnalytics;
    }
    /**
     * Get officer performance analytics
     */
    async getOfficerPerformanceAnalytics(outletId) {
        const matchStage = {};
        if (outletId) {
            matchStage.outletId = new mongoose_1.default.Types.ObjectId(outletId);
        }
        const officers = await Officer_1.Officer.find(matchStage).lean();
        const performanceData = officers.map(officer => ({
            officerId: officer.officerId,
            name: officer.name,
            servicesCompleted: officer.servicesCompleted,
            avgServiceTime: officer.averageServiceTime,
            utilization: this.calculateOfficerUtilization(officer),
        }));
        return performanceData;
    }
    /**
     * Get outlet comparison analytics
     */
    async getOutletComparisonAnalytics() {
        const outlets = await Outlet_1.Outlet.find({ isActive: true }).lean();
        const comparisonData = await Promise.all(outlets.map(async (outlet) => {
            const totalCustomers = await Customer_1.Customer.countDocuments({
                outletId: outlet._id,
                registrationTime: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
            });
            const waitTimeData = await Customer_1.Customer.aggregate([
                {
                    $match: {
                        outletId: outlet._id,
                        actualWaitTime: { $exists: true },
                        registrationTime: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
                    }
                },
                {
                    $group: {
                        _id: null,
                        avgWaitTime: { $avg: '$actualWaitTime' },
                    },
                },
            ]);
            const satisfactionData = await Customer_1.Customer.aggregate([
                {
                    $match: {
                        outletId: outlet._id,
                        'feedback.rating': { $exists: true },
                        registrationTime: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
                    }
                },
                {
                    $group: {
                        _id: null,
                        avgSatisfaction: { $avg: '$feedback.rating' },
                    },
                },
            ]);
            return {
                outletId: outlet._id.toString(),
                name: outlet.name,
                totalCustomers,
                avgWaitTime: waitTimeData[0]?.avgWaitTime || 0,
                satisfaction: satisfactionData[0]?.avgSatisfaction || 0,
            };
        }));
        return comparisonData;
    }
    /**
     * Get customer trends analytics
     */
    async getCustomerTrendsAnalytics(outletId) {
        const matchStage = {
            registrationTime: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        };
        if (outletId) {
            matchStage.outletId = new mongoose_1.default.Types.ObjectId(outletId);
        }
        const trendsData = await Customer_1.Customer.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$registrationTime'
                        }
                    },
                    count: { $sum: 1 },
                    satisfaction: { $avg: '$feedback.rating' },
                },
            },
            {
                $project: {
                    date: '$_id',
                    count: 1,
                    satisfaction: { $ifNull: ['$satisfaction', 0] },
                    _id: 0,
                },
            },
            { $sort: { date: 1 } },
        ]);
        return trendsData;
    }
    /**
     * Generate comprehensive report
     */
    async generateReport(params) {
        const analyticsData = await this.getDashboardAnalytics({
            outletId: params.outletId,
            dateRange: params.dateRange,
        });
        const report = {
            _id: new mongoose_1.default.Types.ObjectId().toString(),
            type: params.reportType,
            dateRange: params.dateRange,
            outletId: params.outletId,
            data: analyticsData,
            generatedBy: 'system', // This should be the actual user ID
            generatedAt: new Date(),
        };
        // Here you would typically save the report to a Reports collection
        // For now, we'll just return it
        return report;
    }
    /**
     * Get saved reports
     */
    async getReports(_filters) {
        // This would typically query a Reports collection
        // For now, returning empty array as placeholder
        return [];
    }
    /**
     * Get real-time metrics
     */
    async getRealTimeMetrics(outletId) {
        const matchStage = {};
        if (outletId) {
            matchStage.outletId = new mongoose_1.default.Types.ObjectId(outletId);
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [currentQueue, beingServed, completedToday, avgWaitTime] = await Promise.all([
            Customer_1.Customer.countDocuments({ ...matchStage, status: 'waiting' }),
            Customer_1.Customer.countDocuments({ ...matchStage, status: 'being_served' }),
            Customer_1.Customer.countDocuments({
                ...matchStage,
                status: 'completed',
                serviceEndTime: { $gte: today }
            }),
            Customer_1.Customer.aggregate([
                {
                    $match: {
                        ...matchStage,
                        actualWaitTime: { $exists: true },
                        registrationTime: { $gte: today }
                    }
                },
                {
                    $group: {
                        _id: null,
                        avgWaitTime: { $avg: '$actualWaitTime' },
                    },
                },
            ]),
        ]);
        return {
            currentQueue,
            beingServed,
            completedToday,
            avgWaitTimeToday: avgWaitTime[0]?.avgWaitTime || 0,
        };
    }
    /**
     * Get peak hours analysis
     */
    async getPeakHoursAnalysis(outletId) {
        const matchStage = {
            registrationTime: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        };
        if (outletId) {
            matchStage.outletId = new mongoose_1.default.Types.ObjectId(outletId);
        }
        const peakHours = await Customer_1.Customer.aggregate([
            { $match: matchStage },
            {
                $project: {
                    hour: { $hour: '$registrationTime' },
                },
            },
            {
                $group: {
                    _id: '$hour',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    hour: '$_id',
                    count: 1,
                    _id: 0,
                },
            },
            { $sort: { count: -1 } },
        ]);
        return peakHours;
    }
    /**
     * Private helper methods
     */
    async getOfficerUtilizationData(outletId) {
        const matchStage = {};
        if (outletId) {
            matchStage.outletId = new mongoose_1.default.Types.ObjectId(outletId);
        }
        const officers = await Officer_1.Officer.find(matchStage).lean();
        return officers.map(officer => ({
            officerId: officer.officerId,
            utilization: this.calculateOfficerUtilization(officer),
        }));
    }
    calculateOfficerUtilization(officer) {
        if (!officer.loginTime)
            return 0;
        const now = new Date();
        const workingTime = now.getTime() - officer.loginTime.getTime();
        const totalServiceTime = officer.totalServiceTime * 1000; // Convert to milliseconds
        if (workingTime <= 0)
            return 0;
        return Math.min((totalServiceTime / workingTime) * 100, 100);
    }
}
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analyticsService.js.map