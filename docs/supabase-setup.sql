-- ============================================
-- DIBBYTOUR SUPABASE SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  report_data JSONB NOT NULL,
  address TEXT,
  safety_score INTEGER,
  risk_level TEXT,
  category TEXT DEFAULT 'unknown',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_address ON reports(address);
CREATE INDEX IF NOT EXISTS idx_reports_safety_score ON reports(safety_score);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reports (they're shareable)
CREATE POLICY "Allow public read access" ON reports
  FOR SELECT USING (true);

-- Allow inserts from authenticated users or service role
CREATE POLICY "Allow inserts" ON reports
  FOR INSERT WITH CHECK (true);

-- Allow updates from service role
CREATE POLICY "Allow updates" ON reports
  FOR UPDATE USING (true);

-- ============================================
-- STORAGE BUCKET (if not already created)
-- ============================================
-- Go to Storage in Supabase Dashboard
-- Create bucket named: screenshots
-- Make it PUBLIC

-- ============================================
-- VERIFY SETUP
-- ============================================
-- Run this to verify:
-- SELECT * FROM reports LIMIT 5;
