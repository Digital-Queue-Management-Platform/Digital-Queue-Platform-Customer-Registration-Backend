import mongoose, { Document } from 'mongoose';
export interface IQueue extends Document {
    outletId: string;
    date: Date;
    currentlyServing?: string;
    totalServed: number;
    totalWaiting: number;
    averageWaitTime: number;
    peakHourData: {
        hour: number;
        count: number;
    }[];
    lastUpdated: Date;
}
export declare const Queue: mongoose.Model<IQueue, {}, {}, {}, mongoose.Document<unknown, {}, IQueue> & IQueue & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Queue.d.ts.map