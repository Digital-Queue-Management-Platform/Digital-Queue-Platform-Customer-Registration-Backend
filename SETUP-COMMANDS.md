# Quick Setup Commands for Database-Agnostic Prisma

This document contains the commands you need to run to get your database-agnostic Prisma setup working.

## 🚀 Initial Setup

### 1. Install Dependencies

```powershell
# Navigate to backend directory
cd backend

# Install Prisma dependencies
npm install @prisma/client@^5.19.1 prisma@^5.19.1 ts-node@^10.9.1
```

### 2. PostgreSQL Setup (Default)

```powershell
# Copy environment file
copy .env.example .env

# Edit .env file to set your DATABASE_URL
# For PostgreSQL (already configured in .env.example):
# DATABASE_URL=postgresql://digital_queue_db_xw6i_user:TO0wKznCBAZ7UdmiiqHv1sqJGQmLAoh6@dpg-d3d60td6ubrc73fbgcng-a/digital_queue_db_xw6i

# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Seed the database (optional)
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio
```

### 3. MongoDB Setup (Alternative)

```powershell
# Switch to MongoDB
npm run switch:mongodb

# Edit .env file and update DATABASE_URL with your MongoDB credentials:
# DATABASE_URL=mongodb+srv://your-user:your-password@cluster.mongodb.net/digital_queue_db

# Generate Prisma client
npx prisma generate

# Push schema to MongoDB (no migrations)
npx prisma db push

# Seed the database (optional)
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio
```

## 🔄 Switching Between Databases

### From PostgreSQL to MongoDB

```powershell
# Run switch script
npm run switch:mongodb

# Update .env DATABASE_URL for MongoDB
# DATABASE_URL=mongodb+srv://your-user:your-password@cluster.mongodb.net/digital_queue_db

# Generate client and push schema
npx prisma generate
npx prisma db push
```

### From MongoDB to PostgreSQL

```powershell
# Run switch script
npm run switch:postgresql

# Update .env DATABASE_URL for PostgreSQL
# DATABASE_URL=postgresql://digital_queue_db_xw6i_user:TO0wKznCBAZ7UdmiiqHv1sqJGQmLAoh6@dpg-d3d60td6ubrc73fbgcng-a/digital_queue_db_xw6i

# Generate client and migrate
npx prisma generate
npx prisma migrate dev --name switch_to_postgresql
```

## 📋 Available NPM Scripts

```powershell
# Database operations
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run PostgreSQL migrations
npm run db:push          # Push schema (for MongoDB)
npm run db:studio        # Open Prisma Studio
npm run db:reset         # Reset database
npm run db:seed          # Seed database with sample data

# Database switching
npm run switch:postgresql # Switch to PostgreSQL
npm run switch:mongodb    # Switch to MongoDB

# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
```

## 🛠 Troubleshooting

### Issue: Provider mismatch
```
Error: Schema parsing error
```
**Solution:** Make sure the `provider` in `prisma/schema.prisma` matches your setup.

### Issue: Client not generated
```
PrismaClient is unable to be run in the browser
```
**Solution:** Run `npx prisma generate` after any schema changes.

### Issue: Migration errors
**PostgreSQL:** Use `npx prisma migrate dev`
**MongoDB:** Use `npx prisma db push` (no migrations needed)

## 📁 Key Files Created

- **`.env.example`** - Environment template with both database configs
- **`prisma/schema.prisma`** - Database-agnostic schema
- **`scripts/switch-db.js`** - Automated database switching
- **`prisma/seed.ts`** - Database seeding script
- **`DATABASE-SETUP-GUIDE.md`** - Comprehensive documentation

## 🎯 Next Steps

1. Run the setup commands above for your preferred database
2. Update your existing controllers to use Prisma instead of Mongoose
3. Test the database switching functionality
4. Deploy with your chosen database provider

## 📚 Documentation

- [Prisma Documentation](https://www.prisma.io/docs/)
- [DATABASE-SETUP-GUIDE.md](./DATABASE-SETUP-GUIDE.md) - Full documentation