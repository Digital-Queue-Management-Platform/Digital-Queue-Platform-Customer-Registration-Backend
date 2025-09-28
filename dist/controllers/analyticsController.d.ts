import { Request, Response } from 'express';
export declare class AnalyticsController {
    private analyticsService;
    constructor();
    /**
     * Get comprehensive analytics dashboard data
     */
    getDashboard: (req: Request, res: Response) => Promise<any>;
    /**
     * Get wait time analytics
     */
    getWaitTimes: (req: Request, res: Response) => Promise<any>;
    /**
     * Get service type distribution analytics
     */
    getServiceTypes: (req: Request, res: Response) => Promise<void>;
    /**
     * Get officer performance analytics
     */
    getOfficerPerformance: (req: Request, res: Response) => Promise<any>;
    /**
     * Get outlet comparison analytics
     */
    getOutletComparison: (_req: Request, res: Response) => Promise<void>;
    /**
     * Get customer trends analytics
     */
    getCustomerTrends: (req: Request, res: Response) => Promise<void>;
    /**
     * Generate and save analytics report
     */
    generateReport: (req: Request, res: Response) => Promise<void>;
    /**
     * Get saved reports
     */
    getReports: (req: Request, res: Response) => Promise<void>;
    /**
     * Get real-time analytics metrics
     */
    getRealTimeMetrics: (req: Request, res: Response) => Promise<void>;
    /**
     * Get peak hours analysis
     */
    getPeakHoursAnalysis: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=analyticsController.d.ts.map