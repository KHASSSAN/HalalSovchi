-- Профили Mini App. Идемпотентно: если profiles уже была без telegram_id — дополняем колонки.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  telegram_id bigint,
  first_name text,
  last_name text,
  username text,
  telegram_photo_url text,
  language_code text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists telegram_id bigint;

alter table public.profiles add column if not exists first_name text;

alter table public.profiles add column if not exists last_name text;

alter table public.profiles add column if not exists username text;

alter table public.profiles add column if not exists telegram_photo_url text;

alter table public.profiles add column if not exists language_code text;

alter table public.profiles add column if not exists onboarding_completed boolean;

alter table public.profiles add column if not exists created_at timestamptz;

alter table public.profiles add column if not exists updated_at timestamptz;

update public.profiles
set onboarding_completed = coalesce(onboarding_completed, false)
where onboarding_completed is null;

update public.profiles
set created_at = coalesce(created_at, now())
where created_at is null;

update public.profiles
set updated_at = coalesce(updated_at, now())
where updated_at is null;

alter table public.profiles
  alter column onboarding_completed set default false,
  alter column created_at set default now(),
  alter column updated_at set default now();

-- Уникальность telegram_id (несколько NULL допустимо до заполнения Edge Function)
create unique index if not exists profiles_telegram_id_uidx on public.profiles (telegram_id);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;

drop policy if exists "profiles_update_own" on public.profiles;

drop policy if exists "profiles_insert_own" on public.profiles;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

grant select, insert, update on public.profiles to authenticated;

grant all on public.profiles to service_role;
