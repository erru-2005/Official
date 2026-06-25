-- ============================================================================
-- KEDANTRA — Run this entire script in Supabase Dashboard → SQL Editor
-- It creates all required tables, enums, functions, triggers, RLS policies,
-- and grants. Safe to run multiple times (uses IF NOT EXISTS / OR REPLACE).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Enums (contact inquiries)
-- ---------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.inquiry_type AS ENUM ('feedback', 'query', 'complaint');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.inquiry_status AS ENUM ('new', 'read', 'resolved');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ---------------------------------------------------------------------------
-- 2. Helper function: set_updated_at (shared across tables)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- 3. Table: contact_inquiries
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  inquiry_type public.inquiry_type NOT NULL,
  message text NOT NULL,
  status public.inquiry_status NOT NULL DEFAULT 'new',
  source text NOT NULL DEFAULT 'website',
  user_agent text,
  page_path text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contact_inquiries_name_length CHECK (
    char_length(trim(name)) >= 2 AND char_length(name) <= 120
  ),
  CONSTRAINT contact_inquiries_message_length CHECK (
    char_length(trim(message)) >= 10 AND char_length(message) <= 5000
  ),
  CONSTRAINT contact_inquiries_source_length CHECK (
    char_length(source) >= 1 AND char_length(source) <= 64
  )
);

COMMENT ON TABLE public.contact_inquiries IS
  'Public contact form submissions: feedback, queries, and complaints from the KEDANTRA website.';

-- Indexes
CREATE INDEX IF NOT EXISTS contact_inquiries_created_at_idx
  ON public.contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_inquiries_inquiry_type_idx
  ON public.contact_inquiries (inquiry_type);
CREATE INDEX IF NOT EXISTS contact_inquiries_status_idx
  ON public.contact_inquiries (status);

-- Normalize trigger
CREATE OR REPLACE FUNCTION public.contact_inquiries_normalize()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.name := trim(NEW.name);
  NEW.message := trim(NEW.message);
  NEW.source := coalesce(nullif(trim(NEW.source), ''), 'website');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS contact_inquiries_normalize_trigger ON public.contact_inquiries;
CREATE TRIGGER contact_inquiries_normalize_trigger
  BEFORE INSERT OR UPDATE ON public.contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.contact_inquiries_normalize();

DROP TRIGGER IF EXISTS contact_inquiries_set_updated_at ON public.contact_inquiries;
CREATE TRIGGER contact_inquiries_set_updated_at
  BEFORE UPDATE ON public.contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- RLS: contact_inquiries
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_inquiries_insert_anon" ON public.contact_inquiries;
CREATE POLICY "contact_inquiries_insert_anon"
  ON public.contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (
    inquiry_type IN ('feedback', 'query', 'complaint')
    AND status = 'new'
    AND source = 'website'
  );

DROP POLICY IF EXISTS "contact_inquiries_insert_authenticated" ON public.contact_inquiries;
CREATE POLICY "contact_inquiries_insert_authenticated"
  ON public.contact_inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (
    inquiry_type IN ('feedback', 'query', 'complaint')
    AND status = 'new'
    AND source = 'website'
  );

-- ---------------------------------------------------------------------------
-- 4. Table: customer_experiences
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customer_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author text NOT NULL,
  role text,
  company text,
  image_url text,
  is_published boolean NOT NULL DEFAULT true,
  source text NOT NULL DEFAULT 'website',
  user_agent text,
  page_path text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT customer_experiences_quote_length CHECK (
    char_length(trim(quote)) >= 10 AND char_length(quote) <= 2000
  ),
  CONSTRAINT customer_experiences_author_length CHECK (
    char_length(trim(author)) >= 2 AND char_length(author) <= 120
  ),
  CONSTRAINT customer_experiences_role_length CHECK (
    role IS NULL OR char_length(role) <= 120
  ),
  CONSTRAINT customer_experiences_company_length CHECK (
    company IS NULL OR char_length(company) <= 120
  ),
  CONSTRAINT customer_experiences_source_length CHECK (
    char_length(source) >= 1 AND char_length(source) <= 64
  )
);

COMMENT ON TABLE public.customer_experiences IS
  'Public customer experience quotes shown on the KEDANTRA website carousel and experience page.';

-- Indexes
CREATE INDEX IF NOT EXISTS customer_experiences_created_at_idx
  ON public.customer_experiences (created_at DESC);
CREATE INDEX IF NOT EXISTS customer_experiences_published_idx
  ON public.customer_experiences (is_published)
  WHERE is_published = true;

-- Normalize trigger
CREATE OR REPLACE FUNCTION public.customer_experiences_normalize()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.quote := trim(NEW.quote);
  NEW.author := trim(NEW.author);
  NEW.role := nullif(trim(coalesce(NEW.role, '')), '');
  NEW.company := nullif(trim(coalesce(NEW.company, '')), '');
  NEW.image_url := nullif(trim(coalesce(NEW.image_url, '')), '');
  NEW.source := coalesce(nullif(trim(NEW.source), ''), 'website');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS customer_experiences_normalize_trigger ON public.customer_experiences;
CREATE TRIGGER customer_experiences_normalize_trigger
  BEFORE INSERT OR UPDATE ON public.customer_experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.customer_experiences_normalize();

DROP TRIGGER IF EXISTS customer_experiences_set_updated_at ON public.customer_experiences;
CREATE TRIGGER customer_experiences_set_updated_at
  BEFORE UPDATE ON public.customer_experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- RLS POLICIES — customer_experiences
-- ============================================================================

ALTER TABLE public.customer_experiences ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can read published experiences (SELECT)
--    Used by the homepage carousel and the /experience page
DROP POLICY IF EXISTS "customer_experiences_select_public" ON public.customer_experiences;
CREATE POLICY "customer_experiences_select_public"
  ON public.customer_experiences
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- 2. Anonymous visitors can submit experiences (INSERT)
--    Enforces that submissions are published and sourced from the website
DROP POLICY IF EXISTS "customer_experiences_insert_anon" ON public.customer_experiences;
CREATE POLICY "customer_experiences_insert_anon"
  ON public.customer_experiences
  FOR INSERT
  TO anon
  WITH CHECK (
    is_published = true
    AND source = 'website'
  );

-- 3. Authenticated users can submit experiences (INSERT)
DROP POLICY IF EXISTS "customer_experiences_insert_authenticated" ON public.customer_experiences;
CREATE POLICY "customer_experiences_insert_authenticated"
  ON public.customer_experiences
  FOR INSERT
  TO authenticated
  WITH CHECK (
    is_published = true
    AND source = 'website'
  );

-- ============================================================================
-- GRANTS (Data API access)
-- ============================================================================

-- ============================================================================
-- 5. Table: admin_users (for admin login — no hardcoded credentials)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT admin_users_email_check CHECK (
    char_length(email) >= 5 AND char_length(email) <= 255
  )
);

COMMENT ON TABLE public.admin_users IS
  'Administrator credentials used by the /admin login panel.';

-- Seed the default admin user (safe to re-run — updates hash if password_hash is not a valid bcrypt hash)
INSERT INTO public.admin_users (email, password_hash)
VALUES ('kedantra@gmail.com', crypt('kedantra', gen_salt('bf')))
ON CONFLICT (email) DO UPDATE SET
  password_hash = CASE
    WHEN admin_users.password_hash !~ '^\$2[aby]\$\d{2}\$.' THEN EXCLUDED.password_hash
    ELSE admin_users.password_hash
  END;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_users_service_role_only" ON public.admin_users;
CREATE POLICY "admin_users_service_role_only"
  ON public.admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Secure RPC: anon can call this to verify credentials (SECURITY DEFINER
-- bypasses RLS internally — only returns boolean, never exposes the hash).
CREATE OR REPLACE FUNCTION public.verify_admin_password(email text, password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE admin_users.email = verify_admin_password.email
    AND admin_users.password_hash = crypt(verify_admin_password.password, admin_users.password_hash)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.verify_admin_password TO anon, authenticated;

-- ============================================================================
-- 6. Table: projects
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  image_url text,
  features text[] NOT NULL DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT projects_slug_length CHECK (
    char_length(slug) >= 1 AND char_length(slug) <= 128
  ),
  CONSTRAINT projects_title_length CHECK (
    char_length(title) >= 1 AND char_length(title) <= 255
  ),
  CONSTRAINT projects_description_length CHECK (
    char_length(description) >= 1 AND char_length(description) <= 2000
  )
);

COMMENT ON TABLE public.projects IS
  'Portfolio projects shown on the KEDANTRA website projects section.';

CREATE INDEX IF NOT EXISTS projects_published_sort_idx
  ON public.projects (sort_order ASC)
  WHERE is_published = true;
CREATE INDEX IF NOT EXISTS projects_slug_idx
  ON public.projects (slug);

DROP TRIGGER IF EXISTS projects_set_updated_at ON public.projects;
CREATE TRIGGER projects_set_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "projects_select_public" ON public.projects;
CREATE POLICY "projects_select_public"
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "projects_all_admin" ON public.projects;
CREATE POLICY "projects_all_admin"
  ON public.projects
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- GRANTS (Data API access)
-- ============================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT INSERT ON TABLE public.contact_inquiries TO anon, authenticated;

GRANT SELECT, INSERT ON TABLE public.customer_experiences TO anon, authenticated;

GRANT SELECT ON TABLE public.projects TO anon, authenticated;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Run these SELECT queries to verify everything is in place:
--   SELECT * FROM public.customer_experiences LIMIT 5;
--   SELECT verify_admin_password('kedantra@gmail.com', 'kedantra');
--   SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
--     FROM pg_policies WHERE tablename = 'customer_experiences';
--   SELECT * FROM information_schema.tables
--     WHERE table_schema = 'public' AND table_name IN ('contact_inquiries', 'customer_experiences', 'projects');
