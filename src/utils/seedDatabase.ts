import { Customer } from '../models/Customer';
import { Officer } from '../models/Officer';
import { Outlet } from '../models/Outlet';
import bcrypt from 'bcryptjs';

export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Customer.deleteMany({});
    await Officer.deleteMany({});
    await Outlet.deleteMany({});

    // Create sample outlets
    const outlets = await Outlet.create([
      {
        name: 'Main Branch',
        location: 'Downtown',
        address: '123 Main St, City Center',
        capacity: 50,
        serviceTypes: ['General Inquiry', 'Account Services', 'Loan Applications', 'Card Services'],
        operatingHours: {
          open: '09:00',
          close: '17:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        },
        isActive: true,
      },
      {
        name: 'North Branch',
        location: 'Northside',
        address: '456 North Ave, North District',
        capacity: 30,
        serviceTypes: ['General Inquiry', 'Account Services', 'Money Transfer'],
        operatingHours: {
          open: '08:30',
          close: '16:30',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        },
        isActive: true,
      },
    ]);

    // Create sample officers
    const hashedPassword = await bcrypt.hash('password123', 12);
    const officers = await Officer.create([
      {
        officerId: 'OFF001',
        name: 'John Smith',
        email: 'john.smith@dqm.com',
        phoneNumber: '+1234567890',
        outletId: outlets[0]._id,
        password: hashedPassword,
        status: 'available',
        servicesCompleted: 45,
        averageServiceTime: 12,
        totalServiceTime: 540,
      },
      {
        officerId: 'OFF002',
        name: 'Jane Doe',
        email: 'jane.doe@dqm.com',
        phoneNumber: '+1234567891',
        outletId: outlets[0]._id,
        password: hashedPassword,
        status: 'busy',
        servicesCompleted: 38,
        averageServiceTime: 15,
        totalServiceTime: 570,
      },
      {
        officerId: 'OFF003',
        name: 'Mike Johnson',
        email: 'mike.johnson@dqm.com',
        phoneNumber: '+1234567892',
        outletId: outlets[1]._id,
        password: hashedPassword,
        status: 'available',
        servicesCompleted: 52,
        averageServiceTime: 10,
        totalServiceTime: 520,
      },
    ]);

    // Create sample customers
    const serviceTypes = ['General Inquiry', 'Account Services', 'Loan Applications', 'Card Services', 'Money Transfer'];
    const priorities = ['normal', 'vip', 'disabled', 'senior'] as const;
    const statuses = ['waiting', 'being_served', 'completed', 'cancelled'] as const;

    const customers = [];
    for (let i = 1; i <= 100; i++) {
      const registrationTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
      const serviceStartTime = Math.random() > 0.3 ? new Date(registrationTime.getTime() + Math.random() * 60 * 60 * 1000) : undefined;
      const serviceEndTime = serviceStartTime ? new Date(serviceStartTime.getTime() + Math.random() * 30 * 60 * 1000) : undefined;
      
      customers.push({
        name: `Customer ${i}`,
        phoneNumber: `+123456${String(i).padStart(4, '0')}`,
        email: Math.random() > 0.5 ? `customer${i}@email.com` : undefined,
        serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        tokenNumber: `T${String(i).padStart(3, '0')}`,
        qrCode: `QR${String(i).padStart(3, '0')}`,
        outletId: outlets[Math.floor(Math.random() * outlets.length)]._id,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        registrationTime,
        estimatedWaitTime: Math.random() * 3600 * 1000, // 0-60 minutes
        actualWaitTime: Math.random() * 2400 * 1000, // 0-40 minutes
        serviceStartTime,
        serviceEndTime,
        assignedOfficerId: Math.random() > 0.5 ? officers[Math.floor(Math.random() * officers.length)]._id : undefined,
        feedback: Math.random() > 0.6 ? {
          rating: Math.floor(Math.random() * 5) + 1,
          comment: 'Sample feedback comment',
          submittedAt: new Date(),
        } : undefined,
      });
    }

    await Customer.create(customers);

    console.log('✅ Database seeded successfully!');
    console.log(`📍 Created ${outlets.length} outlets`);
    console.log(`👨‍💼 Created ${officers.length} officers`);
    console.log(`👥 Created ${customers.length} customers`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};