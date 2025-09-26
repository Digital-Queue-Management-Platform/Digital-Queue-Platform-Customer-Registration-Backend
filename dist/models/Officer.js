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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Officer = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const officerSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Officer = mongoose_1.default.model('Officer', officerSchema);
//# sourceMappingURL=Officer.js.map