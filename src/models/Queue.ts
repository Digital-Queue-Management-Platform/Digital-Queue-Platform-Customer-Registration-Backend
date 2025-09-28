import mongoose, { Schema, Document } from 'mongoose';

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

const queueSchema = new Schema<IQueue>({
  outletId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
  },
  currentlyServing: {
    type: String,
  },
  totalServed: {
    type: Number,
    default: 0,
  },
  totalWaiting: {
    type: Number,
    default: 0,
  },
  averageWaitTime: {
    type: Number,
    default: 0,
  },
  peakHourData: [{
    hour: {
      type: Number,
      min: 0,
      max: 23,
    },
    count: {
      type: Number,
      default: 0,
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

// Compound index for outlet and date
queueSchema.index({ outletId: 1, date: 1 }, { unique: true });

export const Queue = mongoose.model<IQueue>('Queue', queueSchema);