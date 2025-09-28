import mongoose, { Document } from 'mongoose';
export interface IServiceType extends Document {
    id: string;
    name: string;
    description: string;
    estimatedDuration: number;
    category: string;
    isActive: boolean;
    requirements?: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const ServiceType: mongoose.Model<IServiceType, {}, {}, {}, mongoose.Document<unknown, {}, IServiceType> & IServiceType & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=ServiceType.d.ts.map