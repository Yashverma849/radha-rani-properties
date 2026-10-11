-- ==============================================================================
-- Radha Rani Properties - Database Schema
-- 1. Schedule Consultation (app/schedule-consultation/page.tsx)
-- 2. Curated To Your Exact Needs / Property Desk (components/PropertyDesk.tsx)
-- ==============================================================================

-- ==============================================================================
-- POSTGRESQL / SUPABASE SCRIPT (RECOMMENDED FOR NEXT.JS & SUPABASE / NEON)
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- Table 1: schedule_consultations
-- Captures scheduled appointments for Site Visits, LIC Advisory, and Housing Loans
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS schedule_consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_id VARCHAR(50) UNIQUE,                          -- e.g. 'RRP-CONS-202610-101'
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    service VARCHAR(50) NOT NULL DEFAULT 'property',          -- 'property' (Plots/Builder Site Visit), 'lic' (LIC Advisory), 'loans' (Housing Loan Advisory)
    meeting_mode VARCHAR(50) NOT NULL DEFAULT 'visit',        -- 'visit' (Accompanied Site Visit), 'whatsapp' (WhatsApp Consultation)
    preferred_date DATE,                                      -- Preferred appointment date
    time_slot VARCHAR(100) DEFAULT 'Morning (10:00 AM – 1:00 PM)', -- Selected time band
    location_pocket VARCHAR(255) DEFAULT 'Palam Colony / Main Area', -- Selected pocket/area
    notes TEXT,                                               -- Specific questions, notes or requirements
    consent BOOLEAN NOT NULL DEFAULT TRUE,                    -- Affirmative contact consent
    status VARCHAR(50) NOT NULL DEFAULT 'pending',            -- 'pending', 'confirmed', 'completed', 'cancelled'
    source VARCHAR(100) DEFAULT 'Website Consultation Page',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_schedule_consultations_mobile ON schedule_consultations(mobile);
CREATE INDEX IF NOT EXISTS idx_schedule_consultations_service ON schedule_consultations(service);
CREATE INDEX IF NOT EXISTS idx_schedule_consultations_status ON schedule_consultations(status);
CREATE INDEX IF NOT EXISTS idx_schedule_consultations_preferred_date ON schedule_consultations(preferred_date);
CREATE INDEX IF NOT EXISTS idx_schedule_consultations_created_at ON schedule_consultations(created_at DESC);


-- ------------------------------------------------------------------------------
-- Table 2: curated_property_requirements
-- Captures "Curated To Your Exact Needs" desk submissions (Buy/Rent sourcing or Sell/Rent listings)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS curated_property_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_id VARCHAR(50) UNIQUE,                          -- e.g. 'RRP-245892-108'
    lead_type VARCHAR(50) NOT NULL DEFAULT 'source',          -- 'source' (Sourcing / Buy / Rent) or 'list' (Have Property to Sell / Rent)
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    property_type VARCHAR(150) NOT NULL,                      -- e.g. 'Residential Plot (50–200 sq yd)', 'Builder Floor'
    location VARCHAR(255) NOT NULL,                           -- e.g. 'Palam Colony (Main Area)', 'Sadh Nagar'
    configuration VARCHAR(100),                               -- e.g. 'Plot (50–100 sq yd)', '2 BHK Floor'
    budget VARCHAR(100),                                      -- e.g. '₹25 Lakh – ₹50 Lakh'
    requirements TEXT,                                        -- Detailed specifications from client
    consent BOOLEAN NOT NULL DEFAULT TRUE,                    -- Affirmative contact consent
    status VARCHAR(50) NOT NULL DEFAULT 'new',                -- 'new', 'contacted', 'shortlisted', 'closed'
    source VARCHAR(100) DEFAULT 'Property Desk Portal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_curated_requirements_mobile ON curated_property_requirements(mobile);
CREATE INDEX IF NOT EXISTS idx_curated_requirements_lead_type ON curated_property_requirements(lead_type);
CREATE INDEX IF NOT EXISTS idx_curated_requirements_status ON curated_property_requirements(status);
CREATE INDEX IF NOT EXISTS idx_curated_requirements_location ON curated_property_requirements(location);
CREATE INDEX IF NOT EXISTS idx_curated_requirements_created_at ON curated_property_requirements(created_at DESC);


-- ------------------------------------------------------------------------------
-- Optional: Auto-update `updated_at` trigger for PostgreSQL
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_schedule_consultations_timestamp ON schedule_consultations;
CREATE TRIGGER trg_update_schedule_consultations_timestamp
BEFORE UPDATE ON schedule_consultations
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_update_curated_requirements_timestamp ON curated_property_requirements;
CREATE TRIGGER trg_update_curated_requirements_timestamp
BEFORE UPDATE ON curated_property_requirements
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();


-- ==============================================================================
-- MYSQL / MARIADB SCRIPT (IF USING MYSQL / AWS RDS / PLANETSCALE)
-- ==============================================================================
/*
CREATE TABLE IF NOT EXISTS schedule_consultations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reference_id VARCHAR(50) UNIQUE,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    service ENUM('property', 'lic', 'loans') NOT NULL DEFAULT 'property',
    meeting_mode ENUM('visit', 'whatsapp') NOT NULL DEFAULT 'visit',
    preferred_date DATE NULL,
    time_slot VARCHAR(100) DEFAULT 'Morning (10:00 AM – 1:00 PM)',
    location_pocket VARCHAR(255) DEFAULT 'Palam Colony / Main Area',
    notes TEXT,
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    source VARCHAR(100) DEFAULT 'Website Consultation Page',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_schedule_consultations_mobile (mobile),
    INDEX idx_schedule_consultations_status (status),
    INDEX idx_schedule_consultations_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS curated_property_requirements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reference_id VARCHAR(50) UNIQUE,
    lead_type ENUM('source', 'list') NOT NULL DEFAULT 'source',
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    property_type VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    configuration VARCHAR(100) NULL,
    budget VARCHAR(100) NULL,
    requirements TEXT NULL,
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    status ENUM('new', 'contacted', 'shortlisted', 'closed') NOT NULL DEFAULT 'new',
    source VARCHAR(100) DEFAULT 'Property Desk Portal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_curated_requirements_mobile (mobile),
    INDEX idx_curated_requirements_lead_type (lead_type),
    INDEX idx_curated_requirements_status (status),
    INDEX idx_curated_requirements_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
*/
