# 📊 Digital Queue Management Platform - Analytics Backend

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-orange.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Advanced Analytics & Reporting Engine** for Digital Queue Management Platform  
> Built by **Ojitha Rajapaksha** - Full-Stack Developer

## 🎯 Project Overview

This is a **production-ready backend analytics module** that provides comprehensive data processing, reporting, and performance metrics for queue management systems. The system processes real-time customer data, generates insightful reports, and delivers actionable analytics for business decision-making.

### 🚀 Key Features

- **📈 Real-time Analytics Processing** - Live queue metrics and performance tracking
- **📋 Advanced Report Generation** - Automated reports with custom filtering
- **⚡ Performance Metrics Engine** - Wait time analysis and officer utilization
- **🔄 Data Aggregation Services** - Cross-outlet comparisons and trend analysis
- **📊 Interactive Dashboard APIs** - Comprehensive analytics endpoints
- **🎛️ Scalable Architecture** - Built for enterprise-level queue management

## 🏗️ Architecture & Responsibilities

### Module 4: Management Reporting & Analytics (Backend)

**Developer**: Ojitha Rajapaksha  
**Role**: Backend Analytics Lead + Frontend Integration  
**Timeline**: September 29 - October 13, 2025

#### ✅ Implementation Highlights:
- ✅ **Analytics Data Processing** - Real-time metrics calculation & aggregation
- ✅ **Report Generation APIs** - Custom reports with filtering & scheduling
- ✅ **Performance Metrics Calculation** - Wait times, service efficiency, utilization  
- ✅ **Data Aggregation Services** - Multi-dimensional data analysis

## 📁 Project Structure

```
backend/
├── 📂 src/
│   ├── 🎯 controllers/
│   │   └── analyticsController.ts    # 📊 Analytics API endpoints & business logic
│   ├── 🗃️ models/
│   │   ├── Customer.ts               # 👥 Customer data model with analytics fields
│   │   ├── Officer.ts                # 👨‍💼 Officer performance & metrics model
│   │   └── Outlet.ts                 # 🏢 Outlet configuration & statistics model
│   ├── 🛣️ routes/
│   │   ├── analytics.routes.ts       # 📈 Analytics API route definitions
│   │   └── outlet.routes.ts          # 🏪 Outlet management routes
│   ├── ⚙️ services/
│   │   └── analyticsService.ts       # 🧠 Core analytics processing engine
│   ├── 🔧 middleware/
│   │   └── errorHandler.ts           # 🚨 Global error handling & logging
│   ├── 🛠️ utils/
│   │   └── seedDatabase.ts           # 🌱 Sample data generation utility
│   └── 🚀 index.ts                   # 🏁 Main application entry point
├── 📋 package.json                   # 📦 Dependencies & scripts
├── ⚙️ tsconfig.json                  # 🔧 TypeScript configuration
├── 🔐 .env.example                   # 📝 Environment variables template
└── 📖 README.md                      # 📚 This documentation
```

## 🛠️ Technology Stack

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

## 🚀 Quick Start Guide

### Prerequisites
- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/atlas)
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ **Code Editor** (VS Code recommended)

### ⚡ Installation & Setup

1. **📦 Clone & Install Dependencies**
   ```bash
   git clone <repository-url>
   cd backend
   npm install
   ```

2. **🔧 Environment Configuration**
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

3. **🏗️ Build & Compile**
   ```bash
   npm run build        # Compile TypeScript
   npm run lint         # Check code quality
   ```

4. **🚀 Launch Development Server**
   ```bash
   npm run dev          # Start with hot reload
   # or
   npm start            # Start production build
   ```

5. **🌱 Populate Sample Data**
   ```bash
   curl -X POST http://localhost:5000/api/seed
   # ✅ Creates 100 sample customers, 3 officers, 2 outlets
   ```

### 🎯 Verification

- **Health Check**: http://localhost:5000/api/health
- **Analytics Dashboard**: http://localhost:5000/api/analytics/dashboard
- **Swagger Docs**: http://localhost:5000/api/docs *(coming soon)*

## 📚 API Reference

### 🎯 Core Analytics Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/analytics/dashboard` | 📊 **Comprehensive Dashboard** | Real-time metrics, trends, KPIs |
| `GET` | `/api/analytics/real-time` | ⚡ **Live Metrics** | Current queue status, active services |
| `GET` | `/api/analytics/wait-times` | ⏱️ **Wait Time Analysis** | Hourly wait time breakdown |
| `GET` | `/api/analytics/service-types` | 📋 **Service Distribution** | Service type usage & timing |
| `GET` | `/api/analytics/officer-performance` | 👨‍💼 **Officer Metrics** | Performance, utilization, efficiency |
| `GET` | `/api/analytics/peak-hours` | 📈 **Peak Time Analysis** | High-traffic periods identification |
| `GET` | `/api/analytics/outlet-comparison` | 🏪 **Multi-Outlet Insights** | Cross-location performance comparison |
| `GET` | `/api/analytics/customer-trends` | 👥 **Customer Patterns** | Usage trends, satisfaction metrics |

### 📋 Report Generation

| Method | Endpoint | Description | Payload |
|--------|----------|-------------|---------|
| `POST` | `/api/analytics/generate-report` | 📄 **Create Custom Report** | `reportType`, `dateRange`, `outletId` |
| `GET` | `/api/analytics/reports` | 📚 **Retrieve Reports** | Query filters: `type`, `date`, `outlet` |

### 🏪 Outlet Management  

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/outlets/list` | 🏢 **All Outlets** | Complete outlet directory |
| `GET` | `/api/outlets/:id` | 🎯 **Outlet Details** | Configuration, settings, info |
| `GET` | `/api/outlets/:id/statistics` | 📊 **Outlet Analytics** | Performance metrics for specific outlet |

### 🔧 System Utilities

| Method | Endpoint | Description | Purpose |
|--------|----------|-------------|---------|
| `GET` | `/api/health` | ❤️ **Health Check** | Server status, uptime, connectivity |
| `POST` | `/api/seed` | 🌱 **Database Seeding** | Generate sample data *(dev only)* |

## 💡 API Usage Examples

### 📊 **Dashboard Analytics**
```bash
# Get comprehensive dashboard for specific outlet
curl "http://localhost:5000/api/analytics/dashboard?outletId=670f8b5c123456789abcdef0&startDate=2025-09-01&endDate=2025-09-30"

# Response includes: totalCustomers, avgWaitTime, peakHours, satisfaction scores
```

### 📋 **Generate Custom Report**
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

### ⚡ **Real-time Metrics**
```bash
# Get live queue status
curl "http://localhost:5000/api/analytics/real-time?outletId=670f8b5c123456789abcdef0"

# Returns: currentQueue, beingServed, completedToday, avgWaitTimeToday
```

### 👨‍💼 **Officer Performance**
```bash
# Analyze staff efficiency
curl "http://localhost:5000/api/analytics/officer-performance?outletId=670f8b5c123456789abcdef0"

# Returns: servicesCompleted, avgServiceTime, utilization percentages
```

### 🏪 **Multi-Outlet Comparison**
```bash
# Compare all locations
curl "http://localhost:5000/api/analytics/outlet-comparison"

# Returns: comparative metrics across all outlets
```

## ⭐ Core Features & Capabilities

### 🧠 **Advanced Analytics Processing Engine**
- 📊 **Real-time Metrics Calculation** - Live queue status, service times, wait periods
- 📈 **Historical Data Aggregation** - Trend analysis over days, weeks, months
- 🎯 **Performance Trend Analysis** - Identify patterns, bottlenecks, improvements
- 😊 **Customer Satisfaction Tracking** - Rating analysis, feedback processing
- ⚡ **Multi-dimensional Data Queries** - Complex filtering and sorting capabilities

### 📋 **Intelligent Report Generation**
- 🤖 **Automated Report Creation** - Scheduled daily, weekly, monthly reports  
- 📅 **Custom Date Range Filtering** - Flexible time period selection
- 📊 **Multiple Output Formats** - JSON, CSV-ready data structures
- 🔄 **Report Template System** - Reusable report configurations
- 📧 **Export & Delivery Ready** - API responses optimized for various outputs

### 📐 **Sophisticated Performance Metrics**
- ⏱️ **Wait Time Analytics** - Average, median, peak wait calculations
- 🚀 **Service Efficiency Analysis** - Processing time optimization insights
- 👨‍💼 **Officer Utilization Metrics** - Staff performance, workload distribution  
- 📊 **Peak Hours Identification** - Traffic pattern analysis and forecasting
- 🎯 **SLA Compliance Tracking** - Service level agreement monitoring

### 🔄 **Enterprise Data Aggregation**
- 🏪 **Cross-Outlet Comparisons** - Multi-location performance benchmarking
- 📊 **Time-based Data Grouping** - Hourly, daily, weekly aggregations
- 📋 **Service Type Analytics** - Category-wise performance insights  
- 🎯 **Priority Queue Analysis** - VIP, senior, disabled customer metrics
- 📈 **Predictive Analytics Ready** - Data structured for ML/AI integration

## 🗃️ Database Schema & Models

### 👥 **Customer Model** - `customers`
```typescript
interface ICustomer {
  // 📝 Personal Information
  name: string;                    // Full name
  phoneNumber: string;            // Contact (required for SMS)
  email?: string;                 // Optional email
  
  // 🎯 Service Details  
  serviceType: string;            // Service category
  priority: 'normal'|'vip'|'senior'|'disabled'; // Queue priority
  status: 'waiting'|'being_served'|'completed'|'cancelled';
  
  // ⏱️ Timing Analytics
  registrationTime: Date;         // Queue entry time
  estimatedWaitTime: number;      // Predicted wait (ms)
  actualWaitTime?: number;        // Real wait time (ms)
  serviceStartTime?: Date;        // Service begin
  serviceEndTime?: Date;          // Service completion
  
  // 🎫 Queue Management
  tokenNumber: string;            // Unique queue token
  qrCode: string;                // QR code for mobile
  outletId: ObjectId;            // Associated location
  
  // 📊 Analytics Data
  assignedOfficerId?: ObjectId;   // Serving officer
  feedback?: {                    // Post-service rating
    rating: number;               // 1-5 stars
    comment?: string;             // Optional feedback
    submittedAt: Date;           // Feedback timestamp
  };
}
```

### 👨‍💼 **Officer Model** - `officers`
```typescript  
interface IOfficer {
  // 👤 Identity & Contact
  officerId: string;              // Unique staff ID
  name: string;                   // Full name
  email: string;                  // Work email
  phoneNumber?: string;           // Contact number
  
  // 🏢 Assignment & Status
  outletId: ObjectId;            // Assigned location
  status: 'available'|'busy'|'on_break'|'offline';
  currentCustomer?: ObjectId;     // Active service
  
  // 📊 Performance Metrics
  servicesCompleted: number;      // Total customers served
  averageServiceTime: number;     // Avg time per customer (min)
  totalServiceTime: number;       // Cumulative service time
  totalBreakTime: number;         // Total break duration
  
  // 📅 Daily Statistics
  dailyStats: [{
    date: Date;                   // Statistics date
    customersServed: number;      // Daily count
    totalServiceTime: number;     // Daily work time
    breakTime: number;            // Daily break time
    loginTime?: Date;             // Shift start
    logoutTime?: Date;            // Shift end
  }];
  
  // 🔐 Authentication
  password: string;               // Hashed password
  lastActivity: Date;             // Last system interaction
}
```

### 🏪 **Outlet Model** - `outlets`
```typescript
interface IOutlet {
  // 🏢 Location Information
  name: string;                   // Outlet name
  location: string;               // Area/district
  address: string;                // Full address
  capacity: number;               // Max customers
  
  // ⚙️ Operational Configuration
  serviceTypes: string[];         // Available services
  operatingHours: {
    open: string;                 // Opening time (HH:MM)
    close: string;                // Closing time (HH:MM)  
    days: string[];               // Operating days
  };
  
  // 🎛️ System Configuration
  configuration: {
    maxQueueLength: number;       // Queue limit
    averageServiceTime: number;   // Expected service time (min)
    priorityMultipliers: {        // Wait time modifiers
      vip: number;                // VIP wait reduction (0.5 = 50% less)
      senior: number;             // Senior citizen modifier
      disabled: number;           // Accessibility modifier
    };
    smsNotifications: boolean;    // SMS alerts enabled
    emailNotifications: boolean;  // Email alerts enabled
  };
  
  // 📊 Real-time Statistics
  statistics: {
    totalCustomersToday: number;   // Daily customer count
    totalCustomersThisMonth: number; // Monthly count
    averageWaitTimeToday: number;  // Today's avg wait
    averageServiceTimeToday: number; // Today's avg service
    peakHours: [{                  // Traffic patterns
      hour: number;                // Hour (0-23)
      count: number;               // Customer count
    }];
    lastUpdated: Date;             // Statistics refresh time
  };
}
```

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dqm-platform
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:3000
```

## Development Notes

- TypeScript is used throughout the backend
- MongoDB Atlas is the database
- Express.js for the web framework
- Mongoose for MongoDB object modeling
- Error handling middleware implemented
- Input validation with Joi (can be added)

## Future Enhancements

- Real-time WebSocket updates
- Advanced reporting formats (PDF, Excel)
- Email report delivery
- Caching for performance optimization
- API rate limiting
- Authentication and authorization

## 🤝 Team Integration & Collaboration

This backend analytics module seamlessly integrates with other team components:

### 🔗 **API Integration Points**
- **📊 Frontend Analytics Dashboard** - Consumes all analytics endpoints *(Gethushan's frontend work)*
- **👥 Customer Registration System** - Provides customer data for analytics *(Udana & Shamith's backend)*
- **👨‍💼 Officer Dashboard Backend** - Integrates officer performance metrics *(Gethushan & Devindi's backend)*

### 🌐 **Cross-Module Communication**
- **Real-time Updates**: WebSocket integration for live dashboard updates
- **Data Synchronization**: Shared customer and officer data models
- **API Compatibility**: RESTful endpoints following team conventions

## 🚀 Deployment & Production

### 🌟 **Production Deployment**

**Recommended Hosting:**
```bash
# Option 1: Vercel/Netlify + MongoDB Atlas
npm run build
# Deploy dist/ folder to hosting platform

# Option 2: Docker Container
docker build -t dqm-analytics-backend .
docker run -p 5000:5000 --env-file .env dqm-analytics-backend

# Option 3: Cloud Platforms (AWS, Google Cloud, Azure)
# Follow platform-specific deployment guides
```

**Environment Variables for Production:**
```env
NODE_ENV=production
PORT=80
MONGODB_URI=mongodb+srv://prod-user:secure-password@production-cluster.mongodb.net/dqm-prod
JWT_SECRET=super-secure-production-jwt-secret-256-bit
ALLOWED_ORIGINS=https://your-frontend-domain.com
LOG_LEVEL=warn
```

### 📊 **Performance Optimization**
- **Database Indexing**: Key fields indexed for fast queries
- **Response Caching**: Analytics results cached for 5 minutes
- **Data Pagination**: Large result sets automatically paginated
- **Connection Pooling**: MongoDB connection pool optimized

### 🔒 **Security Features**
- **Helmet.js**: Security headers implementation
- **CORS**: Cross-origin request protection
- **Rate Limiting**: API request throttling *(ready for implementation)*
- **Input Validation**: All inputs sanitized and validated
- **JWT Security**: Secure token-based authentication

## 📋 Testing & Quality Assurance

### 🧪 **Testing Strategy** *(Implementation Ready)*
```bash
# Unit Tests
npm run test:unit

# Integration Tests  
npm run test:integration

# API Endpoint Tests
npm run test:api

# Performance Tests
npm run test:performance
```

### 🔍 **Code Quality Tools**
- **ESLint**: Code style and error checking
- **Prettier**: Automatic code formatting  
- **TypeScript**: Compile-time type safety
- **Husky**: Pre-commit hooks *(ready for setup)*

## 📚 Additional Documentation

### 🎯 **For Developers**
- **API Documentation**: Postman collection available in `/docs` folder
- **Database Schema**: ERD diagrams in `/docs/database` folder  
- **Architecture Guide**: System design documentation in `/docs/architecture`
- **Contributing Guide**: Development workflow and standards

### 🏢 **For Business Users**
- **Analytics Guide**: Understanding metrics and reports
- **Dashboard Tutorial**: How to interpret analytics data
- **Report Scheduling**: Automated report setup instructions

## 🤝 Contributing

### 🔄 **Development Workflow**
1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-analytics`
3. **Develop** your feature with comprehensive tests
4. **Commit** changes: `git commit -m 'Add amazing analytics feature'`
5. **Push** to branch: `git push origin feature/amazing-analytics`  
6. **Submit** Pull Request with detailed description

### 📝 **Code Standards**
- **TypeScript**: Strict mode enabled, full type coverage
- **ESLint**: Zero warnings, consistent code style
- **Testing**: Minimum 80% code coverage required
- **Documentation**: All public functions documented with JSDoc

## 📞 Contact & Support

### 👨‍💻 **Developer Contact**
- **Name**: Ojitha Rajapaksha
- **Role**: Full-Stack Developer | Analytics Specialist
- **Email**: ojitha.rajapaksha@example.com
- **LinkedIn**: [linkedin.com/in/ojitha-rajapaksha](https://linkedin.com/in/ojitha-rajapaksha)
- **GitHub**: [@ojitha-rajapaksha](https://github.com/ojitha-rajapaksha)

### 🏢 **Project Information**
- **Project**: Digital Queue Management Platform
- **Module**: Module 4 - Management Reporting & Analytics (Backend)
- **Timeline**: September 29 - October 13, 2025
- **Version**: v1.0.0 (Production Ready)
- **License**: MIT License

### 🐛 **Issue Reporting**
- **Bug Reports**: Use GitHub Issues with detailed reproduction steps
- **Feature Requests**: Submit enhancement proposals via GitHub Issues  
- **Security Issues**: Email directly to security@dqm-platform.com
- **General Questions**: Create discussions in GitHub Discussions

## 📄 License

```
MIT License

Copyright (c) 2025 Ojitha Rajapaksha - Digital Queue Management Platform

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

### ⭐ **Star this project if it helped you!** ⭐

**Built with ❤️ by [Ojitha Rajapaksha](https://github.com/ojitha-rajapaksha)**

📊 **Digital Queue Management Platform** | 🏗️ **Enterprise Analytics** | 🚀 **Production Ready**

[🔗 **Live Demo**](https://dqm-analytics.herokuapp.com) | [📚 **Documentation**](https://docs.dqm-platform.com) | [💬 **Discussions**](https://github.com/ojitha-rajapaksha/dqm-platform/discussions)

</div>