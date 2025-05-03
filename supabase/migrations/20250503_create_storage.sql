
-- Create a bucket for user avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Allow authenticated users to upload avatars
CREATE POLICY "Users can upload their own avatars"
ON storage.objects
FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated'
  AND bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own avatars
CREATE POLICY "Users can update their own avatars"
ON storage.objects
FOR UPDATE
USING (
  auth.role() = 'authenticated'
  AND bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own avatars
CREATE POLICY "Users can delete their own avatars"
ON storage.objects
FOR DELETE
USING (
  auth.role() = 'authenticated'
  AND bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow anyone to read avatars
CREATE POLICY "Anyone can read avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

-- Create a new table for health metrics
CREATE TABLE IF NOT EXISTS public.health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT NOT NULL, -- 'blood_pressure', 'blood_sugar', 'weight', etc.
  date TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for health metrics
CREATE POLICY "Users can view their own health metrics"
ON public.health_metrics
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health metrics"
ON public.health_metrics
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health metrics"
ON public.health_metrics
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health metrics"
ON public.health_metrics
FOR DELETE
USING (auth.uid() = user_id);
