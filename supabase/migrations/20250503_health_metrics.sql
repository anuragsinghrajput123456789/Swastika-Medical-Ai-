
-- Create table for health metrics
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

-- Create RLS policies
CREATE POLICY "Users can view their own health metrics" ON public.health_metrics
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert their own health metrics" ON public.health_metrics
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update their own health metrics" ON public.health_metrics
  FOR UPDATE USING (auth.uid() = user_id);
  
CREATE POLICY "Users can delete their own health metrics" ON public.health_metrics
  FOR DELETE USING (auth.uid() = user_id);
