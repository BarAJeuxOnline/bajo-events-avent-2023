# Supabase

## Setup supabase-cli

```bash
pnpm supabase login
pnpm supabase link --project-ref <PROJECT_REF> -p <PASSWORD>
```

:warning: before connect to the database think to add the IP adress in the supabase configuration : https://supabase.com/dashboard/project/<your-project>/settings/database

## Development Server

```bash
pnpm run start
```

```bash
pnpm run stop
```

get the status of the local env

```bash
pnpm supabase status
```