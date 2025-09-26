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
exports.Customer = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const customerSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Customer = mongoose_1.default.model('Customer', customerSchema);
//# sourceMappingURL=Customer.js.map