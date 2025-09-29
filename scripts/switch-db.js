#!/usr/bin/env node

/**
 * Database Configuration Switcher
 * 
 * This script helps you switch between PostgreSQL and MongoDB
 * by updating the necessary configuration files.
 * 
 * Usage:
 *   node scripts/switch-db.js postgresql
 *   node scripts/switch-db.js mongodb
 */

const fs = require('fs');
const path = require('path');

const PRISMA_SCHEMA_PATH = path.join(__dirname, '../prisma/schema.prisma');
const ENV_EXAMPLE_PATH = path.join(__dirname, '../.env.example');

function updatePrismaSchema(provider) {
  console.log(`🔄 Updating Prisma schema for ${provider}...`);
  
  let schemaContent = fs.readFileSync(PRISMA_SCHEMA_PATH, 'utf8');
  
  // Update the provider in datasource block
  schemaContent = schemaContent.replace(
    /provider\s*=\s*"(postgresql|mongodb)"/,
    `provider = "${provider}"`
  );
  
  fs.writeFileSync(PRISMA_SCHEMA_PATH, schemaContent);
  console.log(`✅ Updated prisma/schema.prisma provider to "${provider}"`);
}

function updateEnvExample(provider) {
  console.log(`🔄 Updating .env.example for ${provider}...`);
  
  let envContent = fs.readFileSync(ENV_EXAMPLE_PATH, 'utf8');
  
  // Update DATABASE_PROVIDER
  envContent = envContent.replace(
    /DATABASE_PROVIDER=(postgresql|mongodb)/,
    `DATABASE_PROVIDER=${provider}`
  );
  
  // Update DATABASE_URL based on provider
  if (provider === 'postgresql') {
    envContent = envContent.replace(
      /DATABASE_URL=.*$/m,
      'DATABASE_URL=postgresql://digital_queue_db_xw6i_user:TO0wKznCBAZ7UdmiiqHv1sqJGQmLAoh6@dpg-d3d60td6ubrc73fbgcng-a/digital_queue_db_xw6i'
    );
  } else if (provider === 'mongodb') {
    envContent = envContent.replace(
      /DATABASE_URL=.*$/m,
      'DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/digital_queue_db'
    );
  }
  
  fs.writeFileSync(ENV_EXAMPLE_PATH, envContent);
  console.log(`✅ Updated .env.example for ${provider}`);
}

function printInstructions(provider) {
  console.log('\n📋 Next Steps:');
  console.log('================');
  
  if (provider === 'postgresql') {
    console.log('1. Copy .env.example to .env:');
    console.log('   cp .env.example .env');
    console.log('');
    console.log('2. Update your DATABASE_URL in .env with actual PostgreSQL credentials');
    console.log('');
    console.log('3. Generate Prisma client:');
    console.log('   npx prisma generate');
    console.log('');
    console.log('4. Run database migrations:');
    console.log('   npx prisma migrate dev --name init');
    console.log('');
    console.log('5. (Optional) Seed the database:');
    console.log('   npm run seed');
    
  } else if (provider === 'mongodb') {
    console.log('1. Copy .env.example to .env:');
    console.log('   cp .env.example .env');
    console.log('');
    console.log('2. Update your DATABASE_URL in .env with actual MongoDB credentials');
    console.log('   Replace <user> and <password> with your MongoDB Atlas credentials');
    console.log('');
    console.log('3. Generate Prisma client:');
    console.log('   npx prisma generate');
    console.log('');
    console.log('4. Push schema to MongoDB (no migrations needed):');
    console.log('   npx prisma db push');
    console.log('');
    console.log('5. (Optional) Seed the database:');
    console.log('   npm run seed');
  }
  
  console.log('');
  console.log('💡 Tips:');
  console.log('- Make sure to restart your development server after switching');
  console.log('- Update your .env file with the correct DATABASE_URL');
  console.log('- Run "npx prisma studio" to explore your database');
}

function main() {
  const provider = process.argv[2];
  
  if (!provider || !['postgresql', 'mongodb'].includes(provider)) {
    console.error('❌ Error: Please specify a valid database provider');
    console.log('Usage: node scripts/switch-db.js [postgresql|mongodb]');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/switch-db.js postgresql');
    console.log('  node scripts/switch-db.js mongodb');
    process.exit(1);
  }
  
  console.log(`🚀 Switching to ${provider.toUpperCase()}...`);
  console.log('');
  
  try {
    updatePrismaSchema(provider);
    updateEnvExample(provider);
    
    console.log('');
    console.log(`🎉 Successfully configured for ${provider.toUpperCase()}!`);
    
    printInstructions(provider);
    
  } catch (error) {
    console.error('❌ Error switching database configuration:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { updatePrismaSchema, updateEnvExample };