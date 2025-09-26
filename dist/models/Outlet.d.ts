import mongoose, { Document } from 'mongoose';
export interface IOutlet extends Document {
    name: string;
    location: string;
    address: string;
    capacity: number;
    serviceTypes: string[];
    operatingHours: {
        open: string;
        close: string;
        days: string[];
    };
    isActive: boolean;
    configuration: {
        maxQueueLength: number;
        averageServiceTime: number;
        priorityMultipliers: {
            vip: number;
            senior: number;
            disabled: number;
        };
        smsNotifications: boolean;
        emailNotifications: boolean;
    };
    statistics: {
        totalCustomersToday: number;
        totalCustomersThisMonth: number;
        averageWaitTimeToday: number;
        averageServiceTimeToday: number;
        peakHours: {
            hour: number;
            count: number;
        }[];
        lastUpdated: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const Outlet: mongoose.Model<IOutlet, {}, {}, {}, mongoose.Document<unknown, {}, IOutlet> & IOutlet & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Outlet.d.ts.map