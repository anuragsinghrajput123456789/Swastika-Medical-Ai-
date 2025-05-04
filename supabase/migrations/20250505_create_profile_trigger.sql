
-- This trigger is now optional since authentication has been removed
-- It was previously used to automatically create a user profile entry when a new user signs up via Supabase Auth

-- CREATE OR REPLACE FUNCTION public.handle_new_user()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   INSERT INTO public.profiles (id, email, full_name)
--   VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
--   RETURN new;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;

-- -- Create trigger for when users register
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- The above code is now commented out as user authentication has been removed
