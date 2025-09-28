# Digital Queue Management Platform - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-orange.svg)](https://expressjs.com/)
[![Deployed](https://img.shields.io/badge/Deployed-Render-46E3B7.svg)](https://digital-queue-platform-customer.onrender.com)

> **Production-Ready RESTful API** for Digital Queue Management Platform with Analytics & Real-time Processing

## 🌐 Live Deployment

**API Base URL**: [https://digital-queue-platform-customer.onrender.com](https://digital-queue-platform-customer.onrender.com)

**Health Check**: [https://digital-queue-platform-customer.onrender.com/api/health](https://digital-queue-platform-customer.onrender.com/api/health)  

## Project Overview

This is a **production-ready backend analytics module** that provides comprehensive data processing, reporting, and performance metrics for queue management systems. The system processes real-time customer data, generates insightful reports, and delivers actionable analytics for business decision-making.

### Key Features

- **Real-time Analytics Processing** - Live queue metrics and performance tracking
- **Advanced Report Generation** - Automated reports with custom filtering
- **Performance Metrics Engine** - Wait time analysis and officer utilization
- **Data Aggregation Services** - Cross-outlet comparisons and trend analysis
- **Interactive Dashboard APIs** - Comprehensive analytics endpoints
- **Scalable Architecture** - Built for enterprise-level queue management

## Architecture & Responsibilities

### Module 4: Management Reporting & Analytics (Backend)

**Developer**: Ojitha Rajapaksha  
**Role**: Backend Analytics Lead + Frontend Integration  
**Timeline**: September 29 - October 13, 2025

#### Implementation Highlights:
- **Analytics Data Processing** - Real-time metrics calculation & aggregation
- **Report Generation APIs** - Custom reports with filtering & scheduling
- **Performance Metrics Calculation** - Wait times, service efficiency, utilization  
- **Data Aggregation Services** - Multi-dimensional data analysis

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── analyticsController.ts    # Analytics API endpoints & business logic
│   ├── models/
│   │   ├── Customer.ts               # Customer data model with analytics fields
│   │   ├── Officer.ts                # Officer performance & metrics model
│   │   └── Outlet.ts                 # Outlet configuration & statistics model
│   ├── routes/
│   │   ├── analytics.routes.ts       # Analytics API route definitions
│   │   └── outlet.routes.ts          # Outlet management routes
│   ├── services/
│   │   └── analyticsService.ts       #Core analytics processing engine
│   ├── middleware/
│   │   └── errorHandler.ts           # Global error handling & logging
│   ├── utils/
│   │   └── seedDatabase.ts           # Sample data generation utility
│   └── index.ts                   # Main application entry point
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript configuration
├── .env.example                   # Environment variables template
└── README.md                      # This documentation
```

## Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Runtime** | Node.js | 18+ | Server runtime environment |
| **Language** | TypeScript | 5.0+ | Type-safe JavaScript development |
| **Framework** | Express.js | 4.18+ | Web application framework |
| **Database** | MongoDB Atlas | Latest | Cloud-native NoSQL database |
| **ODM** | Mongoose | 7.5+ | MongoDB object modeling |
| **Security** | Helmet, CORS | Latest | Security middleware |
| **Authentication** | JWT, Bcrypt | Latest | Token-based auth & encryption |
| **Validation** | Joi | Latest | Input validation & sanitization |
| **Development** | ts-node-dev | Latest | Development server with hot reload |

## Quick Start Guide

### Prerequisites
- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended)

### Installation & Setup

1. **Clone & Install Dependencies**
   ```bash
   git clone <repository-url>
   cd backend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   **Edit `.env` with your configuration:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dqm-platform
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   NODE_ENV=development
   ```

3. **Build & Compile**
   ```bash
   npm run build        # Compile TypeScript
   npm run lint         # Check code quality
   ```

4. **Launch Development Server**
   ```bash
   npm run dev          # Start with hot reload
   # or
   npm start            # Start production build
   ```

5. **Populate Sample Data**
   ```bash
   curl -X POST http://localhost:5000/api/seed
   # Creates 100 sample customers, 3 officers, 2 outlets
   ```

### Verification

- **Health Check**: http://localhost:5000/api/health
- **Analytics Dashboard**: http://localhost:5000/api/analytics/dashboard
- **Swagger Docs**: http://localhost:5000/api/docs *(coming soon)*

## API Reference

### Core Analytics Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/analytics/dashboard` | **Comprehensive Dashboard** | Real-time metrics, trends, KPIs |
| `GET` | `/api/analytics/real-time` | **Live Metrics** | Current queue status, active services |
| `GET` | `/api/analytics/wait-times` | **Wait Time Analysis** | Hourly wait time breakdown |
| `GET` | `/api/analytics/service-types` | **Service Distribution** | Service type usage & timing |
| `GET` | `/api/analytics/officer-performance` | **Officer Metrics** | Performance, utilization, efficiency |
| `GET` | `/api/analytics/peak-hours` | **Peak Time Analysis** | High-traffic periods identification |
| `GET` | `/api/analytics/outlet-comparison` | **Multi-Outlet Insights** | Cross-location performance comparison |
| `GET` | `/api/analytics/customer-trends` | **Customer Patterns** | Usage trends, satisfaction metrics |

### Report Generation

| Method | Endpoint | Description | Payload |
|--------|----------|-------------|---------|
| `POST` | `/api/analytics/generate-report` | **Create Custom Report** | `reportType`, `dateRange`, `outletId` |
| `GET` | `/api/analytics/reports` | **Retrieve Reports** | Query filters: `type`, `date`, `outlet` |

### Outlet Management  

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/outlets/list` | **All Outlets** | Complete outlet directory |
| `GET` | `/api/outlets/:id` | **Outlet Details** | Configuration, settings, info |
| `GET` | `/api/outlets/:id/statistics` | **Outlet Analytics** | Performance metrics for specific outlet |

### System Utilities

| Method | Endpoint | Description | Purpose |
|--------|----------|-------------|---------|
| `GET` | `/api/health` | **Health Check** | Server status, uptime, connectivity |
| `POST` | `/api/seed` | **Database Seeding** | Generate sample data *(dev only)* |

## API Usage Examples

### **Dashboard Analytics**
```bash
# Get comprehensive dashboard for specific outlet
curl "http://localhost:5000/api/analytics/dashboard?outletId=670f8b5c123456789abcdef0&startDate=2025-09-01&endDate=2025-09-30"

# Response includes: totalCustomers, avgWaitTime, peakHours, satisfaction scores
```

### **Generate Custom Report**
```bash
curl -X POST http://localhost:5000/api/analytics/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "reportType": "monthly",
    "outletId": "670f8b5c123456789abcdef0",
    "dateRange": {
      "start": "2025-09-01T00:00:00.000Z",
      "end": "2025-09-30T23:59:59.999Z"
    }
  }'
```

### **Real-time Metrics**
```bash
# Get live queue status
curl "http://localhost:5000/api/analytics/real-time?outletId=670f8b5c123456789abcdef0"

# Returns: currentQueue, beingServed, completedToday, avgWaitTimeToday
```

### **Officer Performance**
```bash
# Analyze staff efficiency
curl "http://localhost:5000/api/analytics/officer-performance?outletId=670f8b5c123456789abcdef0"

# Returns: servicesCompleted, avgServiceTime, utilization percentages
```

### **Multi-Outlet Comparison**
```bash
# Compare all locations
curl "http://localhost:5000/api/analytics/outlet-comparison"

# Returns: comparative metrics across all outlets
```

## Core Features & Capabilities

### **Advanced Analytics Processing Engine**
- **Real-time Metrics Calculation** - Live queue status, service times, wait periods
- **Historical Data Aggregation** - Trend analysis over days, weeks, months
- **Performance Trend Analysis** - Identify patterns, bottlenecks, improvements
- **Customer Satisfaction Tracking** - Rating analysis, feedback processing
- **Multi-dimensional Data Queries** - Complex filtering and sorting capabilities

### **Intelligent Report Generation**
- **Automated Report Creation** - Scheduled daily, weekly, monthly reports  
- **Custom Date Range Filtering** - Flexible time period selection
- **Multiple Output Formats** - JSON, CSV-ready data structures
- **Report Template System** - Reusable report configurations
- **Export & Delivery Ready** - API responses optimized for various outputs

### **Sophisticated Performance Metrics**
- **Wait Time Analytics** - Average, median, peak wait calculations
- **Service Efficiency Analysis** - Processing time optimization insights
- **Officer Utilization Metrics** - Staff performance, workload distribution  
- **Peak Hours Identification** - Traffic pattern analysis and forecasting
- **SLA Compliance Tracking** - Service level agreement monitoring

### **Enterprise Data Aggregation**
- **Cross-Outlet Comparisons** - Multi-location performance benchmarking
- **Time-based Data Grouping** - Hourly, daily, weekly aggregations
- **Service Type Analytics** - Category-wise performance insights  
- **Priority Queue Analysis** - VIP, senior, disabled customer metrics
- **Predictive Analytics Ready** - Data structured for ML/AI integration

## Future Enhancements

- Real-time WebSocket updates
- Advanced reporting formats (PDF, Excel)
- Email report delivery
- Caching for performance optimization
- API rate limiting
- Authentication and authorization

</div>
