-- Create a bucket for storing movies
insert into storage.buckets (id, name, public)
values ('movies', 'movies', true)
on conflict (id) do nothing;

-- Set up storage policies for the 'movies' bucket

-- Allow public read access to the movies bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'movies' );

-- Allow public insert access to the movies bucket (for the admin portal to upload)
create policy "Public Insert"
on storage.objects for insert
with check ( bucket_id = 'movies' );

-- Allow public update access to the movies bucket
create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'movies' );
