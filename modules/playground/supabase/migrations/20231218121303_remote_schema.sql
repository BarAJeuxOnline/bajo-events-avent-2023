revoke delete on table "public"."members" from "anon";

revoke insert on table "public"."members" from "anon";

revoke references on table "public"."members" from "anon";

revoke select on table "public"."members" from "anon";

revoke trigger on table "public"."members" from "anon";

revoke truncate on table "public"."members" from "anon";

revoke update on table "public"."members" from "anon";

revoke delete on table "public"."members" from "authenticated";

revoke insert on table "public"."members" from "authenticated";

revoke references on table "public"."members" from "authenticated";

revoke select on table "public"."members" from "authenticated";

revoke trigger on table "public"."members" from "authenticated";

revoke truncate on table "public"."members" from "authenticated";

revoke update on table "public"."members" from "authenticated";

revoke delete on table "public"."members" from "service_role";

revoke insert on table "public"."members" from "service_role";

revoke references on table "public"."members" from "service_role";

revoke select on table "public"."members" from "service_role";

revoke trigger on table "public"."members" from "service_role";

revoke truncate on table "public"."members" from "service_role";

revoke update on table "public"."members" from "service_role";

alter table "public"."members" drop constraint "members_profile_fkey";

alter table "public"."staffs" drop constraint "staffs_profile_fkey";

alter table "public"."members" drop constraint "members_pkey";

drop index if exists "public"."members_pkey";

drop table "public"."members";

create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "user" uuid default auth.uid()
);


alter table "public"."profiles" enable row level security;

alter table "public"."events" alter column "created_by" drop not null;

CREATE UNIQUE INDEX members_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "members_pkey" PRIMARY KEY using index "members_pkey";

alter table "public"."profiles" add constraint "profiles_user_fkey" FOREIGN KEY ("user") REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_user_fkey";

alter table "public"."staffs" add constraint "staffs_profile_fkey" FOREIGN KEY (profile) REFERENCES profiles(id) ON DELETE SET NULL not valid;

alter table "public"."staffs" validate constraint "staffs_profile_fkey";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";


