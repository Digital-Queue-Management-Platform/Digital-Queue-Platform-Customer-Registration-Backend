# PostgreSQL Setup Guide for Digital Queue Management Platform

## 🚀 Quick Setup (Current Status)

Your project is now configured for **PostgreSQL only** with Prisma. Here are your options:

## Option 1: Use Render PostgreSQL (When Available)

The Render database connection string is already configured in your `.env` file:
```
DATABASE_URL=postgresql://digital_queue_db_xw6i_user:TO0wKznCBAZ7UdmiiqHv1sqJGQmLAoh6@dpg-d3d60td6ubrc73fbgcng-a/digital_queue_db_xw6i
```

**When the Render database is accessible, run:**
```powershell
# Create and run migrations
npm run db:migrate -- --name init

# Seed the database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## Option 2: Use Local PostgreSQL (Development)

### Install PostgreSQL locally:
1. Download from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember your password for the `postgres` user

### Setup local database:
```powershell
# Create a local database (using psql or pgAdmin)
createdb digital_queue_db

# Update your .env file to use local database:
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/digital_queue_db

# Run migrations
npm run db:migrate -- --name init

# Seed the database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## Option 3: Use Docker PostgreSQL (Easiest for Development)

Create a `docker-compose.yml` file in your backend directory:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: digital_queue_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Then run:
```powershell
# Start PostgreSQL with Docker
docker-compose up -d

# Update .env file:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/digital_queue_db

# Run migrations
npm run db:migrate -- --name init

# Seed the database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

## 📋 What's Been Configured

### ✅ Completed Setup:
- **Dependencies**: Prisma Client and Prisma CLI installed
- **Schema**: PostgreSQL-focused queue management models
- **Environment**: PostgreSQL connection configured
- **Scripts**: Database management NPM scripts added
- **Seed Data**: Ready to populate with sample queue data

### 📊 Database Models:
- **Customer**: Queue customers with token management
- **ServiceType**: Different types of services offered
- **Officer**: Staff members handling customers
- **Outlet**: Different branch locations
- **Queue**: Queue management per outlet/service type

### 🛠 Available Scripts:
```powershell
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run PostgreSQL migrations
npm run db:studio      # Open Prisma Studio (database viewer)
npm run db:reset       # Reset database
npm run db:seed        # Seed with sample data
```

## 🔄 Integration with Your Existing Code

### Replace Mongoose with Prisma:

**Before (Mongoose):**
```typescript
import Customer from '../models/Customer';

const customer = await Customer.create({
  name: 'John Doe',
  phoneNumber: '+1234567890',
  // ...
});
```

**After (Prisma):**
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const customer = await prisma.customer.create({
  data: {
    name: 'John Doe',
    phoneNumber: '+1234567890',
    // ...
  }
});
```

### Example Service Functions:

See `src/services/prismaService.ts` for complete examples of:
- Customer registration
- Queue management
- Service type handling
- Analytics and reporting

## 🚦 Next Steps

1. **Choose your database option** (Render when available, Local, or Docker)
2. **Update `.env`** with the correct DATABASE_URL if needed
3. **Run migrations**: `npm run db:migrate -- --name init`
4. **Seed data**: `npm run db:seed`
5. **Test with Prisma Studio**: `npm run db:studio`
6. **Update your controllers** to use Prisma instead of Mongoose

## 🆘 Troubleshooting

### Connection Issues:
- **Render DB**: Wait for database to be accessible or contact Render support
- **Local DB**: Ensure PostgreSQL service is running
- **Docker**: Run `docker-compose up -d` first

### Schema Issues:
```powershell
# Validate schema
npx prisma validate

# Reset if needed
npm run db:reset

# Regenerate client
npm run db:generate
```

### Migration Issues:
```powershell
# Check migration status
npx prisma migrate status

# Force reset (⚠️ loses data)
npx prisma migrate reset --force
```

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Render PostgreSQL Guide](https://render.com/docs/databases)

Your project is fully configured for PostgreSQL with Prisma! Just choose your database option and run the setup commands. 🎉