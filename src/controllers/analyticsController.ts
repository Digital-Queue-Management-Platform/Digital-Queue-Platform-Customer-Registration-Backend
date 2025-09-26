import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analyticsService';

interface AnalyticsQuery {
  outletId?: string;
  startDate?: string;
  endDate?: string;
  type?: 'daily' | 'weekly' | 'monthly' | 'custom';
}

export class AnalyticsController {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  /**
   * Get comprehensive analytics dashboard data
   */
  public getDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const { outletId, startDate, endDate } = req.query as AnalyticsQuery;
      
      const dateRange = {
        start: startDate ? new Date(startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: endDate ? new Date(endDate) : new Date(),
      };

      const dashboardData = await this.analyticsService.getDashboardAnalytics({
        outletId,
        dateRange,
      });

      res.json({
        success: true,
        data: dashboardData,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard data',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  /**
   * Get wait time analytics
   */
  public getWaitTimes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { outletId } = req.query as AnalyticsQuery;
      
      const waitTimeData = await this.analyticsService.getWaitTimeAnalytics(outletId);

      res.json({
        success: true,
        data: waitTimeData,
      });
    } catch (error) {
      console.error('Error fetching wait time data:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch wait time data',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  /**
   * Get service type distribution analytics
   */
  public getServiceTypes = async (req: Request, res: Response): Promise<void> => {
    try {
      const { outletId } = req.query as AnalyticsQuery;
      
      const serviceTypeData = await this.analyticsService.getServiceTypeAnalytics(outletId);

      res.json({
        success: true,
        data: serviceTypeData,
      });
    } catch (error) {
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
  public getOfficerPerformance = async (req: Request, res: Response): Promise<void> => {
    try {
      const { outletId } = req.query as AnalyticsQuery;
      
      const performanceData = await this.analyticsService.getOfficerPerformanceAnalytics(outletId);

      res.json({
        success: true,
        data: performanceData,
      });
    } catch (error) {
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
  public getOutletComparison = async (_req: Request, res: Response): Promise<void> => {
    try {
      const comparisonData = await this.analyticsService.getOutletComparisonAnalytics();

      res.json({
        success: true,
        data: comparisonData,
      });
    } catch (error) {
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
  public getCustomerTrends = async (req: Request, res: Response): Promise<void> => {
    try {
      const { outletId } = req.query as AnalyticsQuery;
      
      const trendsData = await this.analyticsService.getCustomerTrendsAnalytics(outletId);

      res.json({
        success: true,
        data: trendsData,
      });
    } catch (error) {
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
  public generateReport = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
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
  public getReports = async (req: Request, res: Response): Promise<void> => {
    try {
      const { outletId, type, startDate, endDate } = req.query as AnalyticsQuery;

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
    } catch (error) {
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
  public getRealTimeMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
      const { outletId } = req.query as AnalyticsQuery;

      const metrics = await this.analyticsService.getRealTimeMetrics(outletId);

      res.json({
        success: true,
        data: metrics,
      });
    } catch (error) {
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
  public getPeakHoursAnalysis = async (req: Request, res: Response): Promise<void> => {
    try {
      const { outletId } = req.query as AnalyticsQuery;

      const peakHours = await this.analyticsService.getPeakHoursAnalysis(outletId);

      res.json({
        success: true,
        data: peakHours,
      });
    } catch (error) {
      console.error('Error fetching peak hours analysis:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch peak hours analysis',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}