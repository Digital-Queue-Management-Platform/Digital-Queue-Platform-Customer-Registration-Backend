-- CreateEnum
CREATE TYPE "CustomerPriority" AS ENUM ('NORMAL', 'VIP', 'DISABLED', 'SENIOR');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('WAITING', 'BEING_SERVED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "serviceType" TEXT NOT NULL,
    "priority" "CustomerPriority" NOT NULL DEFAULT 'NORMAL',
    "tokenNumber" TEXT NOT NULL,
    "qrCode" TEXT,
    "outletId" TEXT NOT NULL,
    "status" "CustomerStatus" NOT NULL DEFAULT 'WAITING',
    "registrationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "queuePosition" INTEGER NOT NULL,
    "estimatedWaitTime" INTEGER NOT NULL,
    "actualWaitTime" INTEGER,
    "serviceStartTime" TIMESTAMP(3),
    "serviceEndTime" TIMESTAMP(3),
    "assignedOfficerId" TEXT,
    "feedback" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceType" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedDuration" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "requirements" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Officer" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Officer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outlet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "operatingHours" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outlet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "outletId" TEXT NOT NULL,
    "serviceTypeId" TEXT NOT NULL,
    "currentNumber" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "maxCapacity" INTEGER,
    "avgServiceTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_tokenNumber_key" ON "Customer"("tokenNumber");

-- CreateIndex
CREATE INDEX "Customer_phoneNumber_idx" ON "Customer"("phoneNumber");

-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Customer_tokenNumber_idx" ON "Customer"("tokenNumber");

-- CreateIndex
CREATE INDEX "Customer_status_idx" ON "Customer"("status");

-- CreateIndex
CREATE INDEX "Customer_outletId_idx" ON "Customer"("outletId");

-- CreateIndex
CREATE INDEX "Customer_registrationTime_idx" ON "Customer"("registrationTime");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceType_serviceId_key" ON "ServiceType"("serviceId");

-- CreateIndex
CREATE INDEX "ServiceType_name_idx" ON "ServiceType"("name");

-- CreateIndex
CREATE INDEX "ServiceType_category_idx" ON "ServiceType"("category");

-- CreateIndex
CREATE INDEX "ServiceType_isActive_idx" ON "ServiceType"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Officer_employeeId_key" ON "Officer"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Officer_email_key" ON "Officer"("email");

-- CreateIndex
CREATE INDEX "Officer_employeeId_idx" ON "Officer"("employeeId");

-- CreateIndex
CREATE INDEX "Officer_email_idx" ON "Officer"("email");

-- CreateIndex
CREATE INDEX "Officer_department_idx" ON "Officer"("department");

-- CreateIndex
CREATE INDEX "Outlet_city_idx" ON "Outlet"("city");

-- CreateIndex
CREATE INDEX "Outlet_state_idx" ON "Outlet"("state");

-- CreateIndex
CREATE INDEX "Outlet_isActive_idx" ON "Outlet"("isActive");

-- CreateIndex
CREATE INDEX "Queue_outletId_idx" ON "Queue"("outletId");

-- CreateIndex
CREATE INDEX "Queue_serviceTypeId_idx" ON "Queue"("serviceTypeId");

-- CreateIndex
CREATE INDEX "Queue_isActive_idx" ON "Queue"("isActive");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_assignedOfficerId_fkey" FOREIGN KEY ("assignedOfficerId") REFERENCES "Officer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
