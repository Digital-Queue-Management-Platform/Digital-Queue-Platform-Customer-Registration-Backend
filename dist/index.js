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
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// Import routes - Only analytics for Ojitha's responsibilities
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const outlet_routes_1 = __importDefault(require("./routes/outlet.routes"));
// Import middleware
const errorHandler_1 = require("./middleware/errorHandler");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
// Middleware
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(limiter);
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
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
// Error handling middleware (should be last)
app.use(errorHandler_1.errorHandler);
// 404 handler
app.use('*', (_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
// Database connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(mongoURI);
        console.log('✅ Connected to MongoDB Atlas');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
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