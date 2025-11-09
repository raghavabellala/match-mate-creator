-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE gender AS ENUM ('male', 'female', 'other');
CREATE TYPE marital_status AS ENUM ('never_married', 'divorced', 'widowed', 'separated');
CREATE TYPE subscription_plan AS ENUM ('free', 'monthly', 'yearly');
CREATE TYPE profile_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  gender gender NOT NULL,
  date_of_birth DATE NOT NULL,
  marital_status marital_status NOT NULL,
  height_cm INTEGER,
  religion TEXT,
  caste TEXT,
  mother_tongue TEXT,
  location_city TEXT,
  location_state TEXT,
  location_country TEXT DEFAULT 'India',
  education TEXT,
  occupation TEXT,
  annual_income TEXT,
  about_me TEXT,
  looking_for TEXT,
  profile_photo_url TEXT,
  additional_photos TEXT[] DEFAULT ARRAY[]::TEXT[],
  phone_number TEXT,
  email TEXT,
  subscription_plan subscription_plan DEFAULT 'free',
  subscription_start_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  profile_status profile_status DEFAULT 'pending',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view approved profiles"
ON public.profiles FOR SELECT
USING (profile_status = 'approved' OR user_id = auth.uid());

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Create interests table (for expressing interest in other profiles)
CREATE TABLE public.interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(from_user_id, to_profile_id)
);

ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view interests involving them"
ON public.interests FOR SELECT
USING (
  from_user_id = auth.uid() OR 
  to_profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

CREATE POLICY "Users can send interests"
ON public.interests FOR INSERT
WITH CHECK (auth.uid() = from_user_id);

-- Create profile views tracking table
CREATE TABLE public.profile_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  viewer_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  viewed_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert profile views"
ON public.profile_views FOR INSERT
WITH CHECK (auth.uid() = viewer_user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();