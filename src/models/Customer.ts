import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  phoneNumber: string;
  email?: string;
  serviceType: string;
  priority: 'normal' | 'vip' | 'disabled' | 'senior';
  tokenNumber: string;
  qrCode: string;
  outletId: mongoose.Types.ObjectId;
  status: 'waiting' | 'being_served' | 'completed' | 'cancelled';
  registrationTime: Date;
  estimatedWaitTime: number;
  actualWaitTime?: number;
  serviceStartTime?: Date;
  serviceEndTime?: Date;
  assignedOfficerId?: mongoose.Types.ObjectId;
  feedback?: {
    rating: number;
    comment?: string;
    submittedAt: Date;
  };
}

const customerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['normal', 'vip', 'disabled', 'senior'],
    default: 'normal',
  },
  tokenNumber: {
    type: String,
    required: true,
    unique: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  outletId: {
    type: Schema.Types.ObjectId,
    ref: 'Outlet',
    required: true,
  },
  status: {
    type: String,
    enum: ['waiting', 'being_served', 'completed', 'cancelled'],
    default: 'waiting',
  },
  registrationTime: {
    type: Date,
    default: Date.now,
  },
  estimatedWaitTime: {
    type: Number,
    required: true,
  },
  actualWaitTime: {
    type: Number,
  },
  serviceStartTime: {
    type: Date,
  },
  serviceEndTime: {
    type: Date,
  },
  assignedOfficerId: {
    type: Schema.Types.ObjectId,
    ref: 'Officer',
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
    submittedAt: Date,
  },
}, {
  timestamps: true,
});

// Indexes for performance
customerSchema.index({ outletId: 1, status: 1 });
customerSchema.index({ tokenNumber: 1 });
customerSchema.index({ registrationTime: 1 });
customerSchema.index({ phoneNumber: 1 });

export const Customer = mongoose.model<ICustomer>('Customer', customerSchema);