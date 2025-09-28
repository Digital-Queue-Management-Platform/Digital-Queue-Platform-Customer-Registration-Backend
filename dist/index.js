"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
// import rateLimit from 'express-rate-limit';
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// Import routes - Only analytics for Ojitha's responsibilities
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const outlet_routes_1 = __importDefault(require("./routes/outlet.routes"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
const queue_routes_1 = __importDefault(require("./routes/queue.routes"));
const services_routes_1 = __importDefault(require("./routes/services.routes"));
// Import middleware
const errorHandler_1 = require("./middleware/errorHandler");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
// app.use(limiter); // Disabled for development
app.use((0, cors_1.default)({
    origin: [
        process.env.FRONTEND_URL || "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
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
        const { seedDatabase } = await Promise.resolve().then(() => __importStar(require('./utils/seedDatabase')));
        await seedDatabase();
        res.json({
            success: true,
            message: 'Database seeded successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to seed database',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// API Routes - Only analytics and outlets for Ojitha's tasks
app.use('/api/analytics', analytics_routes_1.default);
app.use('/api/outlets', outlet_routes_1.default);
app.use('/api/customer', customer_routes_1.default);
app.use('/api/queue', queue_routes_1.default);
app.use('/api/services', services_routes_1.default);
// Error handling middleware (should be last)
app.use(errorHandler_1.errorHandler);
// 404 handler
app.use('*', (_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
// Database connection - Priority: MongoDB Atlas for real data
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        const localURI = process.env.MONGODB_LOCAL_URI || 'mongodb://localhost:27017/queueManagement';
        console.log('🔗 Attempting to connect to MongoDB Atlas for real data...');
        // PRIORITY: Try Atlas connection first for real data
        if (mongoURI) {
            try {
                await mongoose_1.default.connect(mongoURI, {
                    serverSelectionTimeoutMS: 15000, // Increased timeout for Atlas
                    socketTimeoutMS: 45000,
                    maxPoolSize: 10,
                    retryWrites: true,
                });
                console.log('✅ Successfully connected to MongoDB Atlas (REAL DATA)');
                console.log('📊 System will display real queue and analytics data');
                return;
            }
            catch (atlasError) {
                console.error('❌ MongoDB Atlas connection failed:', atlasError instanceof Error ? atlasError.message : atlasError);
                console.log('🔄 Trying local MongoDB as fallback...');
            }
        }
        else {
            console.error('❌ MONGODB_URI not found in environment variables');
        }
        // Fallback to local MongoDB
        try {
            await mongoose_1.default.connect(localURI, {
                serverSelectionTimeoutMS: 5000,
            });
            console.log('✅ Connected to local MongoDB (fallback)');
            console.log('⚠️  Using local database - may have limited data');
        }
        catch (localError) {
            console.error('❌ All MongoDB connections failed');
            console.error('Local error:', localError instanceof Error ? localError.message : localError);
            console.log('🚨 Server starting WITHOUT database connection');
            console.log('� APIs will return mock data only');
            // Continue without exiting to allow API testing
        }
    }
    catch (error) {
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
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    mongoose_1.default.connection.close();
});
process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    mongoose_1.default.connection.close();
});
// Start the application
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map