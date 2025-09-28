import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceType extends Document {
  id: string;
  name: string;
  description: string;
  estimatedDuration: number; // in seconds
  category: string;
  isActive: boolean;
  requirements?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const serviceTypeSchema = new Schema<IServiceType>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  estimatedDuration: {
    type: Number,
    required: true,
    min: 60, // minimum 1 minute
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  requirements: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Indexes
serviceTypeSchema.index({ isActive: 1 });
serviceTypeSchema.index({ category: 1 });

export const ServiceType = mongoose.model<IServiceType>('ServiceType', serviceTypeSchema);