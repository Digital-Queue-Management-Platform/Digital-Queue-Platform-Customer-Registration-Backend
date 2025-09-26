import mongoose, { Schema, Document } from 'mongoose';

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

const officerSchema = new Schema<IOfficer>({
  officerId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  outletId: {
    type: Schema.Types.ObjectId,
    ref: 'Outlet',
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'busy', 'on_break', 'offline'],
    default: 'offline',
  },
  currentCustomer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  servicesCompleted: {
    type: Number,
    default: 0,
  },
  averageServiceTime: {
    type: Number,
    default: 0,
  },
  totalServiceTime: {
    type: Number,
    default: 0,
  },
  loginTime: {
    type: Date,
  },
  breakStartTime: {
    type: Date,
  },
  totalBreakTime: {
    type: Number,
    default: 0,
  },
  dailyStats: [{
    date: {
      type: Date,
      required: true,
    },
    customersServed: {
      type: Number,
      default: 0,
    },
    totalServiceTime: {
      type: Number,
      default: 0,
    },
    breakTime: {
      type: Number,
      default: 0,
    },
    loginTime: Date,
    logoutTime: Date,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  lastActivity: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Indexes
officerSchema.index({ officerId: 1 });
officerSchema.index({ outletId: 1, status: 1 });
officerSchema.index({ email: 1 });

export const Officer = mongoose.model<IOfficer>('Officer', officerSchema);