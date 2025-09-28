import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
// import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes - Only analytics for Ojitha's responsibilities
import analyticsRoutes from './routes/analytics.routes';
import outletRoutes from './routes/outlet.routes';
import customerRoutes from './routes/customer.routes';
import queueRoutes from './routes/queue.routes';
import servicesRoutes from './routes/services.routes';

// Import middleware
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting - More lenient for development (disabled for now)
// const limiter = rateLimit({
//   windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
//   max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '1000'),
//   message: {
//     success: false,
//     message: 'Too many requests from this IP, please try again later.',
//     retryAfter: 60
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// Middleware
app.use(helmet());
app.use(compression());
// app.use(limiter); // Disabled for development
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "https://digital-queue-platform-customer-reg.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Digital Queue Management API is running - Analytics Module',
    timestamp: new Date().toISOString()
  });
});

// Seed database endpoint (development only)
app.post('/api/seed', async (_req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        message: 'Seeding not allowed in production'
      });
    }
    
    const { seedDatabase } = await import('./utils/seedDatabase');
    await seedDatabase();
    
    res.json({
      success: true,
      message: 'Database seeded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to seed database',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API Routes - Only analytics and outlets for Ojitha's tasks
app.use('/api/analytics', analyticsRoutes);
app.use('/api/outlets', outletRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/services', servicesRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Database connection with better fallback
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    const localURI = process.env.MONGODB_LOCAL_URI || 'mongodb://localhost:27017/queueManagement';
    
    // Try local MongoDB first for development
    if (process.env.NODE_ENV === 'development') {
      try {
        await mongoose.connect(localURI, {
          serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log('✅ Connected to local MongoDB');
        return;
      } catch (localError) {
        console.log('⚠️  Local MongoDB not available, trying Atlas...');
      }
    }
    
    // Try Atlas connection
    if (mongoURI) {
      try {
        await mongoose.connect(mongoURI, {
          serverSelectionTimeoutMS: 10000, // Timeout after 10s
        });
        console.log('✅ Connected to MongoDB Atlas');
        return;
      } catch (atlasError) {
        console.error('❌ MongoDB Atlas connection error:', atlasError);
      }
    }
    
    // If both fail, try local again as final fallback
    try {
      await mongoose.connect(localURI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ Connected to local MongoDB (fallback)');
    } catch (finalError) {
      console.error('❌ All MongoDB connection attempts failed');
      console.log('💡 Please ensure MongoDB is running locally or check Atlas connection');
      // Don't exit - let the server run without DB for testing API structure
      console.log('🚀 Starting server without database connection...');
    }
  } catch (error) {
    console.error('❌ Database connection setup error:', error);
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Analytics API: http://localhost:${PORT}/api/analytics`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mongoose.connection.close();
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  mongoose.connection.close();
});

// Start the application
startServer();

export default app;