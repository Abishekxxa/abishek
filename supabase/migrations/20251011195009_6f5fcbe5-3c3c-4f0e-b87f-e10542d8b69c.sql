-- Create storage bucket for trading journal photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'trading-journals',
  'trading-journals',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Create trading_journals table
CREATE TABLE public.trading_journals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  journal_date DATE NOT NULL DEFAULT CURRENT_DATE,
  image_url TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trading_journals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trading_journals
CREATE POLICY "Users can view their own journals"
  ON public.trading_journals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own journals"
  ON public.trading_journals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journals"
  ON public.trading_journals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journals"
  ON public.trading_journals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Storage policies for trading-journals bucket
CREATE POLICY "Users can upload their own journal images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'trading-journals' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own journal images"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'trading-journals' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own journal images"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'trading-journals' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own journal images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'trading-journals' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_trading_journals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger
CREATE TRIGGER update_trading_journals_updated_at
  BEFORE UPDATE ON public.trading_journals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_trading_journals_updated_at();