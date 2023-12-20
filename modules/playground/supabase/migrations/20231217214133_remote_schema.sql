
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "http" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."event_types" AS ENUM (
    'animation_letsplay',
    'animation_party',
    'animation_new',
    'animation_lab',
    'tournament',
    'event'
);

ALTER TYPE "public"."event_types" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."test_func"() RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$declare
  res text;
begin
  select content::json->>'quote'
  into res
  from http_get('https://api.kanye.rest');

  return concat('test ', res, ' end');
end;$$;

ALTER FUNCTION "public"."test_func"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."event_avent_calendar" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "member" "uuid",
    "codes" "text"[],
    "nbr_tickets" bigint DEFAULT '0'::bigint,
    "gold_ticket" boolean DEFAULT false NOT NULL,
    "total_tickets" bigint DEFAULT '0'::bigint NOT NULL,
    "completed" boolean DEFAULT false NOT NULL,
    "win_position" integer,
    "validated_codes" "text"[]
);

ALTER TABLE "public"."event_avent_calendar" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "created_by" "uuid" NOT NULL,
    "updated_by" "uuid" DEFAULT "auth"."uid"(),
    "type" "public"."event_types" NOT NULL,
    "slug" character varying NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text" DEFAULT ''::"text" NOT NULL,
    "boardgames" "uuid"[],
    "start_date" timestamp with time zone,
    "end_date" timestamp with time zone,
    "promotional" boolean DEFAULT false NOT NULL,
    "irl" boolean DEFAULT false NOT NULL,
    "places" "uuid"[],
    "links" "text"[],
    "medias" "text"[],
    "animators" "uuid"[]
);

ALTER TABLE "public"."events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."members" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "profile" "uuid" DEFAULT "auth"."uid"()
);

ALTER TABLE "public"."members" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."staffs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone,
    "profile" "uuid",
    "fullname" "text",
    "description" "text" DEFAULT ''::"text" NOT NULL,
    "join_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "medias" "text"[],
    "socials" "text"[],
    "favorites_games" "uuid"[] NOT NULL,
    "permissions" "text"[] NOT NULL,
    "teams" "uuid"[]
);

ALTER TABLE "public"."staffs" OWNER TO "postgres";

ALTER TABLE ONLY "public"."event_avent_calendar"
    ADD CONSTRAINT "event_avent_calendar_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."staffs"
    ADD CONSTRAINT "staffs_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."event_avent_calendar"
    ADD CONSTRAINT "event_avent_calendar_member_fkey" FOREIGN KEY ("member") REFERENCES "auth"."users"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_profile_fkey" FOREIGN KEY ("profile") REFERENCES "auth"."users"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."staffs"
    ADD CONSTRAINT "staffs_profile_fkey" FOREIGN KEY ("profile") REFERENCES "auth"."users"("id") ON DELETE SET NULL;

CREATE POLICY "all auth policy" ON "public"."event_avent_calendar" TO "authenticated" USING (("auth"."uid"() = "member")) WITH CHECK (("auth"."uid"() = "member"));

ALTER TABLE "public"."event_avent_calendar" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."members" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."staffs" ENABLE ROW LEVEL SECURITY;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."test_func"() TO "anon";
GRANT ALL ON FUNCTION "public"."test_func"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."test_func"() TO "service_role";

GRANT ALL ON TABLE "public"."event_avent_calendar" TO "anon";
GRANT ALL ON TABLE "public"."event_avent_calendar" TO "authenticated";
GRANT ALL ON TABLE "public"."event_avent_calendar" TO "service_role";

GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";

GRANT ALL ON TABLE "public"."members" TO "anon";
GRANT ALL ON TABLE "public"."members" TO "authenticated";
GRANT ALL ON TABLE "public"."members" TO "service_role";

GRANT ALL ON TABLE "public"."staffs" TO "anon";
GRANT ALL ON TABLE "public"."staffs" TO "authenticated";
GRANT ALL ON TABLE "public"."staffs" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
