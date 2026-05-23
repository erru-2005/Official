# Supabase — Contact inquiries

## Migrate the database

### Option A: Supabase CLI (recommended)

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

### Option B: SQL Editor

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**
2. Run in order:
   - `supabase/migrations/20260523120000_create_contact_inquiries.sql`
   - `supabase/migrations/20260523130000_remove_email_from_contact_inquiries.sql` (only if you already created the table **with** an `email` column)

## Table: `public.contact_inquiries`

| Column         | Type              | Notes                                    |
|----------------|-------------------|------------------------------------------|
| `id`           | `uuid`            | Primary key, auto-generated              |
| `name`         | `text`            | 2–120 chars, trimmed                     |
| `inquiry_type` | `inquiry_type`    | `feedback` \| `query` \| `complaint`     |
| `message`      | `text`            | 10–5000 chars, trimmed                   |
| `status`       | `inquiry_status`  | `new` (default) \| `read` \| `resolved`  |
| `source`       | `text`            | Default `website`                        |
| `user_agent`   | `text`            | Optional, set by API                       |
| `page_path`    | `text`            | Optional referer/path from API             |
| `created_at`   | `timestamptz`     | Auto                                     |
| `updated_at`   | `timestamptz`     | Auto on update                           |

## Enums

| Type             | Values                              |
|------------------|-------------------------------------|
| `inquiry_type`   | `feedback`, `query`, `complaint`    |
| `inquiry_status` | `new`, `read`, `resolved`           |

## RLS policies

| Policy                                   | Role            | Action | Rule                                           |
|------------------------------------------|-----------------|--------|------------------------------------------------|
| `contact_inquiries_insert_anon`          | `anon`          | INSERT | valid type, `status = new`, `source = website` |
| `contact_inquiries_insert_authenticated` | `authenticated` | INSERT | same as above                                  |

- **No public SELECT** — visitors cannot read submissions.
- **Manage rows** in Dashboard → Table Editor (uses service role), or add an admin SELECT policy later (see commented SQL in the migration).

## App environment

Copy `.env.example` to `.env.local`:

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_ANON_KEY=your_anon_key
```

Restart `npm run dev` after changing env vars.

## Verify inserts

After submitting the form on the site, open **Table Editor** → `contact_inquiries` and confirm a row with `inquiry_type`, `name`, `message`, and `status = new`.
