import mongoose, { Document } from 'mongoose';
export interface ICustomer extends Document {
    name: string;
    phoneNumber: string;
    email?: string;
    serviceType: string;
    priority: 'normal' | 'vip' | 'disabled' | 'senior';
    tokenNumber: string;
    qrCode?: string;
    outletId: string;
    status: 'waiting' | 'being_served' | 'completed' | 'cancelled';
    registrationTime: Date;
    queuePosition: number;
    estimatedWaitTime: number;
    actualWaitTime?: number;
    serviceStartTime?: Date;
    serviceEndTime?: Date;
    assignedOfficerId?: string;
    feedback?: {
        rating: number;
        comment?: string;
        submittedAt: Date;
    };
}
export declare const Customer: mongoose.Model<ICustomer, {}, {}, {}, mongoose.Document<unknown, {}, ICustomer> & ICustomer & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Customer.d.ts.map