-- MathProf DZ production database schema (Supabase/PostgreSQL)
create extension if not exists pgcrypto;

create table if not exists professional_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  school_name text not null,
  wilaya text not null,
  directorate text,
  subject text not null default 'الرياضيات',
  academic_year text not null default '2026–2027',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free','premium')),
  status text not null default 'inactive' check (status in ('active','inactive','expired','cancelled')),
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  document_type text not null check (document_type in ('مذكرة','فرض','اختبار','تمارين')),
  level text not null,
  title text not null,
  status text not null default 'draft' check (status in ('draft','saved','archived')),
  professional_profile_snapshot jsonb not null,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  version_number integer not null,
  content jsonb not null,
  created_at timestamptz not null default now(),
  unique(document_id, version_number)
);

create table if not exists exercises (
  id uuid primary key default gen_random_uuid(),
  level text not null,
  lesson text not null,
  title text not null,
  difficulty text not null default 'متوسط',
  statement text not null,
  solution text not null,
  points numeric(4,1) not null default 5 check(points >= 0 and points <= 20),
  status text not null default 'draft' check(status in ('draft','review','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists documents_owner_idx on documents(owner_user_id);
create index if not exists exercises_level_lesson_idx on exercises(level, lesson);

alter table professional_profiles enable row level security;
alter table subscriptions enable row level security;
alter table documents enable row level security;
alter table document_versions enable row level security;
alter table exercises enable row level security;

create policy "profile owner select" on professional_profiles for select using (auth.uid() = user_id);
create policy "profile owner insert" on professional_profiles for insert with check (auth.uid() = user_id);
create policy "profile owner update" on professional_profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "subscription owner select" on subscriptions for select using (auth.uid() = user_id);

create policy "documents owner all" on documents for all using (auth.uid() = owner_user_id) with check (auth.uid() = owner_user_id);
create policy "versions through owner" on document_versions for all
using (exists(select 1 from documents d where d.id=document_id and d.owner_user_id=auth.uid()))
with check (exists(select 1 from documents d where d.id=document_id and d.owner_user_id=auth.uid()));

create policy "published exercises readable" on exercises for select using (status='published');
