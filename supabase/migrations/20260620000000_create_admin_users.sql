-- Admin users table — credentials stored with pgcrypt hash.
-- Passwords are compared inside Postgres via crypt(), never in app code.
-- Access is exposed through a SECURITY DEFINER RPC function so the
-- API route can verify credentials without holding the service_role key.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT admin_users_email_check CHECK (
    char_length(email) >= 5 AND char_length(email) <= 255
  )
);

COMMENT ON TABLE public.admin_users IS
  'Administrator credentials used by the /admin login panel. Manage rows via Supabase Dashboard SQL Editor.';

-- Seed the default admin user.
-- Change the password by running:
--   UPDATE admin_users SET password_hash = crypt('new-password', gen_salt('bf')) WHERE email = 'kedantra@gmail.com';
INSERT INTO public.admin_users (email, password_hash)
VALUES ('kedantra@gmail.com', crypt('kedantra', gen_salt('bf')))
ON CONFLICT (email) DO NOTHING;

-- RLS: only service_role can touch the table directly
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_users_service_role_only"
  ON public.admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Secure RPC: anon can call this to verify credentials.
-- SECURITY DEFINER lets it bypass RLS on admin_users.
-- The function only returns a boolean — never exposes the hash.
CREATE OR REPLACE FUNCTION public.verify_admin_password(email text, password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.email = verify_admin_password.email
    AND admin_users.password_hash = crypt(verify_admin_password.password, admin_users.password_hash)
  );
END;
$$;

-- Allow anon/authenticated to call the function
GRANT EXECUTE ON FUNCTION public.verify_admin_password TO anon, authenticated;

-- Verification query (run in SQL Editor after migration):
--   SELECT verify_admin_password('kedantra@gmail.com', 'kedantra');
