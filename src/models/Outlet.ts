import mongoose, { Schema, Document } from 'mongoose';

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
    averageServiceTime: number; // in minutes
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
    peakHours: { hour: number; count: number }[];
    lastUpdated: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const outletSchema = new Schema<IOutlet>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  serviceTypes: [{
    type: String,
    required: true,
  }],
  operatingHours: {
    open: {
      type: String,
      required: true,
    },
    close: {
      type: String,
      required: true,
    },
    days: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    }],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  configuration: {
    maxQueueLength: {
      type: Number,
      default: 100,
    },
    averageServiceTime: {
      type: Number,
      default: 15, // 15 minutes
    },
    priorityMultipliers: {
      vip: {
        type: Number,
        default: 0.5, // VIP customers wait 50% less
      },
      senior: {
        type: Number,
        default: 0.8, // Senior citizens wait 20% less
      },
      disabled: {
        type: Number,
        default: 0.7, // Disabled customers wait 30% less
      },
    },
    smsNotifications: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: false,
    },
  },
  statistics: {
    totalCustomersToday: {
      type: Number,
      default: 0,
    },
    totalCustomersThisMonth: {
      type: Number,
      default: 0,
    },
    averageWaitTimeToday: {
      type: Number,
      default: 0,
    },
    averageServiceTimeToday: {
      type: Number,
      default: 0,
    },
    peakHours: [{
      hour: Number,
      count: Number,
    }],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
}, {
  timestamps: true,
});

// Indexes
outletSchema.index({ isActive: 1 });
outletSchema.index({ name: 1 });

export const Outlet = mongoose.model<IOutlet>('Outlet', outletSchema);