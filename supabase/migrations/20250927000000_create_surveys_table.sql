-- Create surveys table for storing epidemiological survey data and indices
CREATE TABLE public.surveys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  disease TEXT NOT NULL CHECK (disease IN ('malaria', 'leptospirosis')),
  houses_surveyed INT NOT NULL DEFAULT 0,
  positive_houses INT NOT NULL DEFAULT 0,
  containers_inspected INT NOT NULL DEFAULT 0,
  positive_containers INT NOT NULL DEFAULT 0,
  rodent_sightings INT NOT NULL DEFAULT 0,
  computed_indices JSONB,
  survey_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on surveys
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;

-- Policies for surveys
CREATE POLICY "Users can view their own surveys"
ON public.surveys
FOR SELECT
USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can insert their own surveys"
ON public.surveys
FOR INSERT
WITH CHECK (user_id::text = auth.uid()::text);

CREATE POLICY "Users can update their own surveys"
ON public.surveys
FOR UPDATE
USING (user_id::text = auth.uid()::text);

CREATE POLICY "Admins can view all surveys"
ON public.surveys
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.users WHERE id::text = auth.uid()::text AND role = 'admin'
));

CREATE POLICY "Admins can update all surveys"
ON public.surveys
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.users WHERE id::text = auth.uid()::text AND role = 'admin'
));
