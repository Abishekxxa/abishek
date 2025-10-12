-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Update trading_journals RLS policies
DROP POLICY IF EXISTS "Users can view their own journals" ON public.trading_journals;
DROP POLICY IF EXISTS "Users can create their own journals" ON public.trading_journals;
DROP POLICY IF EXISTS "Users can update their own journals" ON public.trading_journals;
DROP POLICY IF EXISTS "Users can delete their own journals" ON public.trading_journals;

-- Allow everyone to view journals
CREATE POLICY "Anyone can view journals"
ON public.trading_journals
FOR SELECT
USING (true);

-- Only admins can create journals
CREATE POLICY "Admins can create journals"
ON public.trading_journals
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update journals
CREATE POLICY "Admins can update journals"
ON public.trading_journals
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete journals
CREATE POLICY "Admins can delete journals"
ON public.trading_journals
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Policy for user_roles viewing
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);