# Database-Agnostic Prisma Setup Guide

This guide explains how to use the database-agnostic Prisma configuration in your Digital Queue Management Platform.

## 🎯 Overview

The project is configured to work with both **PostgreSQL** and **MongoDB** by switching configuration files. This allows you to:

- Use PostgreSQL (Render) for production
- Use MongoDB Atlas for development or testing
- Switch between databases without code changes

## 📁 Key Files

- **`prisma/schema.prisma`** - Database schema with cross-compatible models
- **`.env.example`** - Template with both database configurations
- **`scripts/switch-db.js`** - Automated database switching script

## 🚀 Quick Start

### Option 1: Use the Automated Script (Recommended)

```powershell
# Switch to PostgreSQL (Render)
node scripts/switch-db.js postgresql

# Switch to MongoDB Atlas
node scripts/switch-db.js mongodb
```

### Option 2: Manual Configuration

1. **Copy environment file:**
   ```powershell
   cp .env.example .env
   ```

2. **Edit `.env` file:**
   ```env
   # For PostgreSQL
   DATABASE_PROVIDER=postgresql
   DATABASE_URL=postgresql://digital_queue_db_xw6i_user:TO0wKznCBAZ7UdmiiqHv1sqJGQmLAoh6@dpg-d3d60td6ubrc73fbgcng-a/digital_queue_db_xw6i
   
   # OR for MongoDB
   DATABASE_PROVIDER=mongodb
   DATABASE_URL=mongodb+srv://your-user:your-password@cluster.mongodb.net/digital_queue_db
   ```

3. **Update `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "postgresql"  // or "mongodb"
     url      = env("DATABASE_URL")
   }
   ```

## 🔧 Database-Specific Commands

### PostgreSQL (Render Database)

```powershell
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Reset database (if needed)
npx prisma migrate reset

# View data in Prisma Studio
npx prisma studio
```

### MongoDB Atlas

```powershell
# Generate Prisma client
npx prisma generate

# Push schema to database (no migrations)
npx prisma db push

# Reset database (if needed)
npx prisma db push --force-reset

# View data in Prisma Studio
npx prisma studio
```

## 📊 Schema Compatibility Notes

### ID Fields
```prisma
// Cross-compatible approach (recommended)
id String @id @default(cuid())

// PostgreSQL-specific alternatives:
id Int    @id @default(autoincrement())  // Auto-increment
id String @id @default(uuid())           // UUID

// MongoDB-specific alternative:
id String @id @default(auto()) @map("_id") @db.ObjectId
```

### JSON Fields
```prisma
// Works in both databases
metadata Json?

// PostgreSQL: Uses native JSON type
// MongoDB: Stores as document field
```

### Relations
```prisma
// Works the same in both databases
user     User    @relation(fields: [userId], references: [id])
products Product[]
```

### Indexes
```prisma
// Works in both databases
@@index([email])
@@index([status])
@@unique([orderId, productId])
```

## 🌐 Environment Variables

### Required Variables
```env
DATABASE_PROVIDER=postgresql  # or "mongodb"
DATABASE_URL=your_database_url
NODE_ENV=development
PORT=3000
```

### PostgreSQL Configuration
```env
DATABASE_PROVIDER=postgresql
POSTGRESQL_URL=postgresql://digital_queue_db_xw6i_user:TO0wKznCBAZ7UdmiiqHv1sqJGQmLAoh6@dpg-d3d60td6ubrc73fbgcng-a/digital_queue_db_xw6i
DATABASE_URL=${POSTGRESQL_URL}
```

### MongoDB Configuration
```env
DATABASE_PROVIDER=mongodb
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/digital_queue_db
DATABASE_URL=${MONGODB_URL}
```

## 🔄 Switching Between Databases

### From MongoDB to PostgreSQL

1. **Run the switch script:**
   ```powershell
   node scripts/switch-db.js postgresql
   ```

2. **Update your `.env` file:**
   ```env
   DATABASE_PROVIDER=postgresql
   DATABASE_URL=postgresql://digital_queue_db_xw6i_user:TO0wKznCBAZ7UdmiiqHv1sqJGQmLAoh6@dpg-d3d60td6ubrc73fbgcng-a/digital_queue_db_xw6i
   ```

3. **Generate client and migrate:**
   ```powershell
   npx prisma generate
   npx prisma migrate dev --name switch_to_postgresql
   ```

### From PostgreSQL to MongoDB

1. **Run the switch script:**
   ```powershell
   node scripts/switch-db.js mongodb
   ```

2. **Update your `.env` file:**
   ```env
   DATABASE_PROVIDER=mongodb
   DATABASE_URL=mongodb+srv://your-user:your-password@cluster.mongodb.net/digital_queue_db
   ```

3. **Generate client and push schema:**
   ```powershell
   npx prisma generate
   npx prisma db push
   ```

## 📋 Queue Management Models

The schema includes queue-specific models:

- **`Customer`** - Customer information
- **`ServiceType`** - Types of services offered
- **`QueueToken`** - Queue tokens with status tracking
- **`TokenStatus`** - Enum for token states

## 🛠 Troubleshooting

### Common Issues

1. **Provider mismatch error:**
   ```
   Error: Schema parsing error
   ```
   **Solution:** Make sure `provider` in `schema.prisma` matches your `DATABASE_PROVIDER` in `.env`

2. **Connection string format:**
   - PostgreSQL: `postgresql://user:password@host:port/database`
   - MongoDB: `mongodb+srv://user:password@cluster/database`

3. **Migration vs Push:**
   - PostgreSQL: Use `prisma migrate dev`
   - MongoDB: Use `prisma db push`

### Useful Commands

```powershell
# Check Prisma configuration
npx prisma validate

# Format schema file
npx prisma format

# View generated client
npx prisma generate --help

# Inspect database
npx prisma db pull  # Import existing database schema
```

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Provider](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [MongoDB Provider](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [Render PostgreSQL Guide](https://render.com/docs/databases)
- [MongoDB Atlas Guide](https://www.mongodb.com/atlas)