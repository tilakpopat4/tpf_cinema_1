-- Create the 'content' table for TPF Cinemas
CREATE TABLE IF NOT EXISTS public.content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL, -- 'Film' or 'Web Series'
    genre TEXT,
    synopsis TEXT,
    director_name TEXT,
    director_photo_url TEXT,
    landscape_poster_url TEXT,
    portrait_poster_url TEXT,
    media_source TEXT, -- 'mp4' or 'youtube'
    media_url TEXT,
    cast_members JSONB -- array of { name: string, photo_url: string }
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.content
    FOR SELECT
    USING (true);

-- Create policy to allow public insert access (For Admin Portal during dev)
-- IMPORTANT: In production, you should restrict this to authenticated admins only!
CREATE POLICY "Allow public insert access" ON public.content
    FOR INSERT
    WITH CHECK (true);
