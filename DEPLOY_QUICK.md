# 🚀 Quick Deployment Guide

## TL;DR - Deploy to Production

### 1. Deploy Frontend (Vercel)
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
./deploy.sh
# or manually:
cd apps/web && vercel --prod
```

### 2. Deploy Backends (Railway - Recommended)

**Railway is the easiest option for backends:**

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add **two services**:

#### HTTP Backend Service:
- **Root Directory**: `apps/http-backend`
- **Build Command**: `pnpm install && pnpm build`
- **Start Command**: `pnpm start`
- **Port**: 3001
- **Environment Variables**:
  ```
  DATABASE_URL=your_postgres_url
  JWT_SECRET=your_secret_key
  ```

#### WebSocket Backend Service:
- **Root Directory**: `apps/ws-backend`
- **Build Command**: `pnpm install && pnpm build`
- **Start Command**: `pnpm start`
- **Port**: 8080
- **Environment Variables**:
  ```
  DATABASE_URL=your_postgres_url
  JWT_SECRET=your_secret_key
  ```

5. **Add PostgreSQL Database** in Railway:
   - Click "New" → "Database" → "PostgreSQL"
   - Copy the connection string
   - Add it to both services as `DATABASE_URL`

6. **Run Database Migrations**:
   ```bash
   # Locally, pointing to Railway DB
   cd packages/db
   DATABASE_URL="your_railway_postgres_url" pnpm prisma migrate deploy
   ```

### 3. Configure Frontend Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_BACKEND_URL=https://your-http-backend.up.railway.app
NEXT_PUBLIC_WS_URL=wss://your-ws-backend.up.railway.app
```

**Important**: Use `https://` for HTTP backend and `wss://` for WebSocket backend in production!

### 4. Redeploy Frontend
```bash
cd apps/web && vercel --prod
```

---

## ✅ Verification

After deployment, test:
1. Visit your Vercel URL
2. Sign up / Sign in
3. Create a room
4. Send messages
5. Open in another browser/tab and verify real-time updates

---

## 🔧 Alternative Deployment Options

### Option 2: Render.com
Similar to Railway, but:
- Go to [render.com](https://render.com)
- Create two "Web Services"
- Configure build & start commands
- Add PostgreSQL database

### Option 3: Self-hosted (VPS/EC2)
```bash
# SSH into your server
git clone your-repo
cd draw-app
pnpm install

# Build all
pnpm build

# Use PM2 to keep services running
pm2 start apps/http-backend/dist/index.js --name http-api
pm2 start apps/ws-backend/dist/index.js --name ws-server
pm2 save
pm2 startup
```

---

## 📚 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide with troubleshooting.
