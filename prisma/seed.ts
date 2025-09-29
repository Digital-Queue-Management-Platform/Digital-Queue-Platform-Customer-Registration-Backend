import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting PostgreSQL database seeding...');

  // Create Sample Outlets
  console.log('🏢 Creating sample outlets...');
  const outlet1 = await prisma.outlet.create({
    data: {
      name: 'Downtown Branch',
      address: '123 Main Street',
      city: 'Downtown',
      state: 'NY',
      zipCode: '10001',
      phone: '+1-555-0101',
      email: 'downtown@company.com',
      operatingHours: {
        monday: { open: '09:00', close: '17:00' },
        tuesday: { open: '09:00', close: '17:00' },
        wednesday: { open: '09:00', close: '17:00' },
        thursday: { open: '09:00', close: '17:00' },
        friday: { open: '09:00', close: '17:00' },
        saturday: { open: '10:00', close: '14:00' },
        sunday: { closed: true }
      }
    },
  });

  const outlet2 = await prisma.outlet.create({
    data: {
      name: 'Uptown Branch',
      address: '456 Oak Avenue',
      city: 'Uptown',
      state: 'NY',
      zipCode: '10002',
      phone: '+1-555-0102',
      email: 'uptown@company.com',
      operatingHours: {
        monday: { open: '08:00', close: '18:00' },
        tuesday: { open: '08:00', close: '18:00' },
        wednesday: { open: '08:00', close: '18:00' },
        thursday: { open: '08:00', close: '18:00' },
        friday: { open: '08:00', close: '18:00' },
        saturday: { open: '09:00', close: '15:00' },
        sunday: { closed: true }
      }
    },
  });

  // Create Sample Officers
  console.log('👮 Creating sample officers...');
  const officer1 = await prisma.officer.create({
    data: {
      employeeId: 'EMP001',
      name: 'Alice Johnson',
      email: 'alice.johnson@company.com',
      department: 'Customer Service',
    },
  });

  const officer2 = await prisma.officer.create({
    data: {
      employeeId: 'EMP002',
      name: 'Bob Smith',
      email: 'bob.smith@company.com',
      department: 'Technical Support',
    },
  });

  // Create Service Types
  console.log('📋 Creating service types...');
  const generalService = await prisma.serviceType.create({
    data: {
      serviceId: 'GEN001',
      name: 'General Inquiry',
      description: 'General customer service and inquiries',
      estimatedDuration: 600, // 10 minutes in seconds
      category: 'General',
      requirements: ['ID verification']
    },
  });

  const accountService = await prisma.serviceType.create({
    data: {
      serviceId: 'ACC001',
      name: 'Account Services',
      description: 'Account opening, closing, and modifications',
      estimatedDuration: 1200, // 20 minutes in seconds
      category: 'Financial',
      requirements: ['ID verification', 'Proof of address', 'Income documents']
    },
  });

  const technicalSupport = await prisma.serviceType.create({
    data: {
      serviceId: 'TECH001',
      name: 'Technical Support',
      description: 'Technical assistance and troubleshooting',
      estimatedDuration: 900, // 15 minutes in seconds
      category: 'Technical',
      requirements: ['Account information', 'Device details']
    },
  });

  // Create Sample Customers
  console.log('👥 Creating sample customers...');
  await prisma.customer.create({
    data: {
      name: 'John Doe',
      phoneNumber: '+1234567890',
      email: 'john.doe@example.com',
      serviceType: generalService.name,
      priority: 'NORMAL',
      tokenNumber: 'T001',
      qrCode: 'QR_T001_' + Date.now(),
      outletId: outlet1.id,
      status: 'WAITING',
      queuePosition: 1,
      estimatedWaitTime: 10,
      assignedOfficerId: officer1.id,
    },
  });

  await prisma.customer.create({
    data: {
      name: 'Jane Smith',
      phoneNumber: '+1234567891',
      email: 'jane.smith@example.com',
      serviceType: accountService.name,
      priority: 'VIP',
      tokenNumber: 'A002',
      qrCode: 'QR_A002_' + Date.now(),
      outletId: outlet1.id,
      status: 'BEING_SERVED',
      queuePosition: 0,
      estimatedWaitTime: 0,
      actualWaitTime: 5,
      serviceStartTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      assignedOfficerId: officer2.id,
    },
  });

  await prisma.customer.create({
    data: {
      name: 'Bob Johnson',
      phoneNumber: '+1234567892',
      email: 'bob.johnson@example.com',
      serviceType: technicalSupport.name,
      priority: 'SENIOR',
      tokenNumber: 'B001',
      qrCode: 'QR_B001_' + Date.now(),
      outletId: outlet2.id,
      status: 'COMPLETED',
      queuePosition: 0,
      estimatedWaitTime: 15,
      actualWaitTime: 18,
      serviceStartTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      serviceEndTime: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
      assignedOfficerId: officer1.id,
      feedback: {
        rating: 5,
        comment: 'Excellent service, very helpful staff!',
        submittedAt: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago
      }
    },
  });

  // Create Sample Queues
  console.log('📋 Creating sample queues...');
  await prisma.queue.createMany({
    data: [
      {
        name: 'General Service Queue - Downtown',
        outletId: outlet1.id,
        serviceTypeId: generalService.id,
        currentNumber: 1,
        maxCapacity: 50,
        avgServiceTime: 10,
      },
      {
        name: 'Account Services Queue - Downtown',
        outletId: outlet1.id,
        serviceTypeId: accountService.id,
        currentNumber: 2,
        maxCapacity: 30,
        avgServiceTime: 20,
      },
      {
        name: 'Technical Support Queue - Uptown',
        outletId: outlet2.id,
        serviceTypeId: technicalSupport.id,
        currentNumber: 1,
        maxCapacity: 25,
        avgServiceTime: 15,
      },
    ],
  });

  console.log('✅ PostgreSQL database seeding completed successfully!');
  console.log('');
  console.log('� Created:');
  console.log('- 2 Outlets (Downtown Branch, Uptown Branch)');
  console.log('- 2 Officers (Alice Johnson, Bob Smith)');
  console.log('- 3 Service Types (General, Account Services, Technical Support)');
  console.log('- 3 Customers (John Doe, Jane Smith, Bob Johnson)');
  console.log('- 3 Queues');
  console.log('');
  console.log('🚀 You can now run "npm run db:studio" to explore your data!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });