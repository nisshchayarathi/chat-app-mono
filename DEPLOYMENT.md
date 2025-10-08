# Deployment Guide

## Architecture Overview

Your app has 3 parts:
1. **Next.js Web App** (`apps/web`) - Frontend
2. **HTTP Backend** (`apps/http-backend`) - REST API
3. **WebSocket Backend** (`apps/ws-backend`) - Real-time chat

## 🚀 Deploying to Vercel (Frontend Only)

### Step 1: Deploy Next.js App to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   pnpm add -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from the web app directory**:
   ```bash
   cd apps/web
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `draw-app-web` (or your choice)
   - Directory: `./` (current directory)
   - Override settings: `N`

5. **Set Environment Variables** in Vercel Dashboard:
   - `NEXT_PUBLIC_WS_URL` - Your WebSocket server URL
   - `NEXT_PUBLIC_BACKEND_URL` - Your HTTP backend URL
   - `DATABASE_URL` - Your PostgreSQL connection string

### Step 2: Production Deploy
```bash
vercel --prod
```

---

## 🖥️ Deploying Backends (NOT on Vercel)

**Important**: Vercel doesn't support long-running WebSocket connections or persistent Node.js servers. You need to deploy your backends elsewhere.

### Recommended Options:

#### Option 1: Railway.app (Easiest)
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Deploy from GitHub
4. Add two services:
   - `http-backend` (port 3001)
   - `ws-backend` (port 8080)
5. Set environment variables for each:
   - `DATABASE_URL`
   - `JWT_SECRET`

#### Option 2: Render.com
1. Go to [render.com](https://render.com)
2. Create two Web Services:
   - HTTP Backend: Node, build command: `cd apps/http-backend && pnpm install && pnpm build`, start: `pnpm start`
   - WS Backend: Node, build command: `cd apps/ws-backend && pnpm install && pnpm build`, start: `pnpm start`

#### Option 3: DigitalOcean App Platform
1. Create a new app
2. Add components for both backends
3. Configure environment variables

#### Option 4: AWS EC2 / VPS
```bash
# SSH into your server
# Install Node.js, pnpm
# Clone your repo
pnpm install
cd apps/http-backend && pnpm build && pm2 start dist/index.js --name http-backend
cd ../ws-backend && pnpm build && pm2 start dist/index.js --name ws-backend
```

---

## 📝 Environment Variables

### Frontend (apps/web)
Create `apps/web/.env.local`:
```env
NEXT_PUBLIC_WS_URL=wss://your-ws-backend.railway.app
NEXT_PUBLIC_BACKEND_URL=https://your-http-backend.railway.app
```

### HTTP Backend (apps/http-backend)
Create `apps/http-backend/.env`:
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-super-secret-key-change-this
```

### WebSocket Backend (apps/ws-backend)
Create `apps/ws-backend/.env`:
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-super-secret-key-change-this
```

---

## 🗄️ Database Setup

1. **Get a PostgreSQL database**:
   - [Neon](https://neon.tech) (Free tier)
   - [Supabase](https://supabase.com) (Free tier)
   - [Railway](https://railway.app) (Has PostgreSQL addon)

2. **Run Prisma migrations**:
   ```bash
   cd packages/db
   pnpm prisma migrate deploy
   ```

---

## 🔄 Quick Deploy Script

For backends on Railway/Render, add these to your `package.json`:

```json
{
  "scripts": {
    "deploy:web": "cd apps/web && vercel --prod",
    "deploy:all": "pnpm deploy:web"
  }
}
```

---

## ✅ Verification Checklist

After deployment:
- [ ] Frontend loads at Vercel URL
- [ ] Can sign up / sign in
- [ ] Can create a room
- [ ] Can send messages in real-time
- [ ] Messages persist after refresh
- [ ] Environment variables are set correctly
- [ ] Database is accessible from all backends
- [ ] CORS is configured correctly

---

## 🐛 Common Issues

### 1. WebSocket Connection Failed
- Check `NEXT_PUBLIC_WS_URL` is correct (starts with `wss://` not `ws://` in production)
- Ensure WebSocket backend is running and accessible
- Check firewall/security group allows WebSocket connections

### 2. CORS Errors
Make sure your HTTP backend has CORS enabled for your Vercel domain:
```ts
app.use(cors({
  origin: ['https://your-app.vercel.app']
}));
```

### 3. Database Connection Issues
- Verify `DATABASE_URL` is set in all environments
- Check database allows connections from your deployment IPs
- Run migrations: `pnpm prisma migrate deploy`

---

## 📚 Next Steps

1. Set up a custom domain in Vercel
2. Enable HTTPS for all services
3. Set up monitoring (Sentry, LogRocket)
4. Configure CI/CD with GitHub Actions
5. Add rate limiting and security measures
