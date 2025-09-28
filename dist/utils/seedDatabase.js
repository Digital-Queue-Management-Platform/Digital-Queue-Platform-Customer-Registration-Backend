"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const Customer_1 = require("../models/Customer");
const ServiceType_1 = require("../models/ServiceType");
const Queue_1 = require("../models/Queue");
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');
        // Clear existing data
        await Customer_1.Customer.deleteMany({});
        await ServiceType_1.ServiceType.deleteMany({});
        await Queue_1.Queue.deleteMany({});
        // Seed Service Types
        const serviceTypes = [
            {
                id: 'general-inquiry',
                name: 'General Inquiry',
                description: 'General questions and basic information',
                estimatedDuration: 300,
                category: 'Information',
                isActive: true,
                requirements: ['Valid ID']
            },
            {
                id: 'account-services',
                name: 'Account Services',
                description: 'Account opening, closing, and modifications',
                estimatedDuration: 900,
                category: 'Banking',
                isActive: true,
                requirements: ['Valid ID', 'Proof of address', 'Initial deposit']
            },
            {
                id: 'loan-applications',
                name: 'Loan Applications',
                description: 'New loan applications and loan inquiries',
                estimatedDuration: 1800,
                category: 'Lending',
                isActive: true,
                requirements: ['Valid ID', 'Income proof', 'Collateral documents']
            },
            {
                id: 'card-services',
                name: 'Card Services',
                description: 'Credit/debit card issues and applications',
                estimatedDuration: 600,
                category: 'Cards',
                isActive: true,
                requirements: ['Valid ID', 'Proof of address']
            },
            {
                id: 'mobile-services',
                name: 'Mobile Services',
                description: 'SIM cards, mobile plans, and device services',
                estimatedDuration: 420,
                category: 'Telecommunications',
                isActive: true,
                requirements: ['Valid ID', 'Proof of address']
            }
        ];
        await ServiceType_1.ServiceType.insertMany(serviceTypes);
        console.log('✅ Service types seeded');
        // Seed some sample customers for today
        const today = new Date();
        const customers = [
            {
                name: 'John Smith',
                phoneNumber: '+94771234567',
                email: 'john.smith@email.com',
                serviceType: 'account-services',
                outletId: 'outlet-001',
                tokenNumber: 'T001',
                queuePosition: 1,
                estimatedWaitTime: 600,
                status: 'being_served',
                registrationTime: new Date(today.getTime() - 3600000) // 1 hour ago
            },
            {
                name: 'Sarah Johnson',
                phoneNumber: '+94772345678',
                email: 'sarah.johnson@email.com',
                serviceType: 'general-inquiry',
                outletId: 'outlet-001',
                tokenNumber: 'T002',
                queuePosition: 2,
                estimatedWaitTime: 900,
                status: 'waiting',
                registrationTime: new Date(today.getTime() - 2700000) // 45 minutes ago
            },
            {
                name: 'Mike Wilson',
                phoneNumber: '+94773456789',
                email: 'mike.wilson@email.com',
                serviceType: 'mobile-services',
                outletId: 'outlet-001',
                tokenNumber: 'T003',
                queuePosition: 3,
                estimatedWaitTime: 1200,
                status: 'waiting',
                registrationTime: new Date(today.getTime() - 1800000) // 30 minutes ago
            },
            {
                name: 'Emma Davis',
                phoneNumber: '+94774567890',
                serviceType: 'card-services',
                outletId: 'outlet-001',
                tokenNumber: 'T004',
                queuePosition: 4,
                estimatedWaitTime: 1500,
                status: 'waiting',
                registrationTime: new Date(today.getTime() - 900000) // 15 minutes ago
            },
            {
                name: 'David Brown',
                phoneNumber: '+94775678901',
                serviceType: 'mobile-services',
                outletId: 'outlet-001',
                tokenNumber: 'T005',
                queuePosition: 5,
                estimatedWaitTime: 1800,
                status: 'waiting',
                registrationTime: new Date(today.getTime() - 300000) // 5 minutes ago
            }
        ];
        await Customer_1.Customer.insertMany(customers);
        console.log('✅ Sample customers seeded');
        // Create queue record for today
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const queue = new Queue_1.Queue({
            outletId: 'outlet-001',
            date: todayStart,
            currentlyServing: 'T001',
            totalServed: 0,
            totalWaiting: 4,
            averageWaitTime: 8
        });
        await queue.save();
        console.log('✅ Queue record created');
        console.log('✅ Database seeded successfully!');
        console.log(`� Created ${serviceTypes.length} service types`);
        console.log(`� Created ${customers.length} customers`);
        console.log('🏢 Queue system ready for MOBITEL');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};
exports.seedDatabase = seedDatabase;
//# sourceMappingURL=seedDatabase.js.map