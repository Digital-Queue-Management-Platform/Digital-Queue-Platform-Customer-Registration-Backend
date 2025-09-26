export interface AnalyticsData {
    totalCustomers: number;
    averageWaitTime: number;
    averageServiceTime: number;
    peakHours: {
        hour: number;
        count: number;
    }[];
    serviceDistribution: {
        type: string;
        count: number;
    }[];
    customerSatisfaction: number;
    officerUtilization: {
        officerId: string;
        utilization: number;
    }[];
}
export interface ReportFilters {
    outletId?: string;
    dateRange?: {
        start: Date;
        end: Date;
    };
    type?: 'daily' | 'weekly' | 'monthly' | 'custom';
}
export interface Report {
    _id: string;
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    dateRange: {
        start: Date;
        end: Date;
    };
    outletId?: string;
    data: AnalyticsData;
    generatedBy: string;
    generatedAt: Date;
}
export declare class AnalyticsService {
    /**
     * Get comprehensive dashboard analytics
     */
    getDashboardAnalytics(filters: ReportFilters): Promise<AnalyticsData>;
    /**
     * Get wait time analytics by hour
     */
    getWaitTimeAnalytics(outletId?: string): Promise<{
        hour: number;
        avgWaitTime: number;
    }[]>;
    /**
     * Get service type analytics
     */
    getServiceTypeAnalytics(outletId?: string): Promise<{
        type: string;
        count: number;
        avgTime: number;
    }[]>;
    /**
     * Get officer performance analytics
     */
    getOfficerPerformanceAnalytics(outletId?: string): Promise<{
        officerId: string;
        name: string;
        servicesCompleted: number;
        avgServiceTime: number;
        utilization: number;
    }[]>;
    /**
     * Get outlet comparison analytics
     */
    getOutletComparisonAnalytics(): Promise<{
        outletId: string;
        name: string;
        totalCustomers: number;
        avgWaitTime: number;
        satisfaction: number;
    }[]>;
    /**
     * Get customer trends analytics
     */
    getCustomerTrendsAnalytics(outletId?: string): Promise<{
        date: string;
        count: number;
        satisfaction: number;
    }[]>;
    /**
     * Generate comprehensive report
     */
    generateReport(params: {
        outletId?: string;
        reportType: 'daily' | 'weekly' | 'monthly' | 'custom';
        dateRange: {
            start: Date;
            end: Date;
        };
    }): Promise<Report>;
    /**
     * Get saved reports
     */
    getReports(_filters: ReportFilters): Promise<Report[]>;
    /**
     * Get real-time metrics
     */
    getRealTimeMetrics(outletId?: string): Promise<{
        currentQueue: number;
        beingServed: number;
        completedToday: number;
        avgWaitTimeToday: number;
    }>;
    /**
     * Get peak hours analysis
     */
    getPeakHoursAnalysis(outletId?: string): Promise<{
        hour: number;
        count: number;
    }[]>;
    /**
     * Private helper methods
     */
    private getOfficerUtilizationData;
    private calculateOfficerUtilization;
}
//# sourceMappingURL=analyticsService.d.ts.map