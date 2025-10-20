# Environment Variables Setup

This project uses a **single root `.env.local`** file as the source of truth for all environment variables across the monorepo.

## Root `.env.local` (Source of Truth)

Located at `/home/time_walker/projects/projects/chat-app-mono/.env.local`

This is the **only file you need to edit** for configuration changes. All packages and apps inherit these variables:

```bash
# Frontend - Web App
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080

# Backend Services
PORT=3001
WS_PORT=8080

# Security
JWT_SECRET=your_secret_key_here

# Database
DATABASE_URL='postgresql://...'
```

## Package-Level `.env.local` Files (Optional Overrides)

Each package has its own `.env.local` for local development overrides only:

- `apps/web/.env.local` - Frontend specific (inherits from root)
- `apps/http-backend/.env.local` - HTTP backend (inherits from root)
- `apps/ws-backend/.env.local` - WebSocket backend (inherits from root)
- `packages/db/.env.local` - Database client (inherits from root)
- `packages/backend_common/.env.local` - Common backend utilities (inherits from root)

These files are **minimal** and only contain overrides. The root `.env.local` is used for defaults.

## Environment Variables Reference

### Frontend Variables (NEXT*PUBLIC*\*)

Must have `NEXT_PUBLIC_` prefix to be accessible in the browser:

- `NEXT_PUBLIC_BACKEND_URL` - HTTP backend URL (e.g., http://localhost:3001)
- `NEXT_PUBLIC_WS_URL` - WebSocket backend URL (e.g., ws://localhost:8080)

### Backend Variables

- `PORT` - HTTP backend port (default: 3001)
- `WS_PORT` - WebSocket backend port (default: 8080)
- `JWT_SECRET` - Secret key for JWT token signing
- `DATABASE_URL` - Prisma database connection string

## How to Configure

### For Local Development

Simply edit the root `.env.local` file with your desired values. All services will inherit these settings automatically.

### For Production

1. Set environment variables in your deployment platform (Railway, Vercel, etc.)
2. Keep `.env.local` for local defaults only
3. The platform's env vars will override `.env.local`

## Important Notes

- All `.env.local` files are in `.gitignore` and won't be committed
- Root `.env.local` is the single source of truth
- Package-level files are optional and only for local development overrides
- Changes require restarting the development server to take effect
- Frontend variables must have `NEXT_PUBLIC_` prefix to be accessible in browser
- PostgreSQL DATABASE_URL is currently configured; adjust as needed

## Quick Start

1. Edit the root `.env.local` with your configuration:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
```

2. Start the development server:

```bash
pnpm dev
```

All packages will automatically use the root configuration!
