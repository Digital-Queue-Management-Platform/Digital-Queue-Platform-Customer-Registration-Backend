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
exports.Outlet = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const outletSchema = new mongoose_1.Schema({
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
exports.Outlet = mongoose_1.default.model('Outlet', outletSchema);
//# sourceMappingURL=Outlet.js.map