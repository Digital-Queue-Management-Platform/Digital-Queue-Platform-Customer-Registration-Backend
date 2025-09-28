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
exports.Queue = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const queueSchema = new mongoose_1.Schema({
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
exports.Queue = mongoose_1.default.model('Queue', queueSchema);
//# sourceMappingURL=Queue.js.map