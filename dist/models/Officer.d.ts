import mongoose, { Document } from 'mongoose';
export interface IOfficer extends Document {
    officerId: string;
    name: string;
    email: string;
    phoneNumber?: string;
    outletId: mongoose.Types.ObjectId;
    password: string;
    status: 'available' | 'busy' | 'on_break' | 'offline';
    currentCustomer?: mongoose.Types.ObjectId;
    servicesCompleted: number;
    averageServiceTime: number;
    totalServiceTime: number;
    loginTime?: Date;
    breakStartTime?: Date;
    totalBreakTime: number;
    dailyStats: {
        date: Date;
        customersServed: number;
        totalServiceTime: number;
        breakTime: number;
        loginTime?: Date;
        logoutTime?: Date;
    }[];
    isActive: boolean;
    lastActivity: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Officer: mongoose.Model<IOfficer, {}, {}, {}, mongoose.Document<unknown, {}, IOfficer> & IOfficer & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Officer.d.ts.map