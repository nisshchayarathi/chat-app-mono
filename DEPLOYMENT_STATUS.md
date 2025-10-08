# 🎉 Deployment Status & Next Steps

## ✅ **What's Done:**

1. ✅ **Code pushed to GitHub:** https://github.com/NischayRathi/chat-app-mono
2. ✅ **Database ready:** Neon PostgreSQL configured
3. ✅ **Frontend deploying to Vercel:** Auto-deploying from GitHub
4. ⏳ **Backends:** Need to deploy to Render.com (free)

---

## 📋 **Next Steps - Deploy Backends to Render.com**

### **Step 1: Sign Up & Connect GitHub**
1. Go to: **https://render.com**
2. Click **"Get Started"** 
3. **Sign up with GitHub** (easiest)
4. Authorize Render to access: `NischayRathi/chat-app-mono`

---

### **Step 2: Create HTTP Backend Service**

1. Click **"New +"** → **"Web Service"**
2. Select repository: **`chat-app-mono`**
3. Configure:

   **Service Details:**
   - **Name:** `chatapp-http-backend`
   - **Region:** Oregon (or closest to you)
   - **Branch:** `main`
   - **Root Directory:** `apps/http-backend`
   - **Runtime:** `Node`
   - **Build Command:**
     ```
     npm install && npm run build
     ```
   - **Start Command:**
     ```
     npm start
     ```
   - **Instance Type:** **Free** ⭐

4. **Environment Variables** (click "Advanced"):
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_NSRt8Ysjdn5f@ep-gentle-breeze-adqpxi20-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
   ```
   JWT_SECRET=super-secret-production-key-change-this-12345
   ```
   ```
   PORT=3001
   ```

5. Click **"Create Web Service"**
6. **Wait for deployment** (5-10 minutes)
7. **Copy the URL** (e.g., `https://chatapp-http-backend.onrender.com`)

---

### **Step 3: Create WebSocket Backend Service**

1. Click **"New +"** → **"Web Service"**  
2. Select repository: **`chat-app-mono`**
3. Configure:

   **Service Details:**
   - **Name:** `chatapp-ws-backend`
   - **Region:** Same as HTTP backend
   - **Branch:** `main`
   - **Root Directory:** `apps/ws-backend`
   - **Runtime:** `Node`
   - **Build Command:**
     ```
     npm install && npm run build
     ```
   - **Start Command:**
     ```
     npm start
     ```
   - **Instance Type:** **Free** ⭐

4. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_NSRt8Ysjdn5f@ep-gentle-breeze-adqpxi20-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
   ```
   JWT_SECRET=super-secret-production-key-change-this-12345
   ```
   ```
   PORT=8080
   ```

5. Click **"Create Web Service"**
6. **Wait for deployment**
7. **Copy the URL** (e.g., `https://chatapp-ws-backend.onrender.com`)

---

### **Step 4: Configure Frontend Environment Variables**

Once both backends are deployed:

1. Go to **Vercel Dashboard:** https://vercel.com/plakshashris-projects/chatapp
2. Click **"Settings"** → **"Environment Variables"**
3. Add these variables:

   **Variable 1:**
   - **Key:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** `https://chatapp-http-backend.onrender.com` (your HTTP backend URL)
   - **Environments:** Production, Preview, Development

   **Variable 2:**
   - **Key:** `NEXT_PUBLIC_WS_URL`
   - **Value:** `wss://chatapp-ws-backend.onrender.com` (your WS backend URL - note: `wss://` not `https://`)
   - **Environments:** Production, Preview, Development

4. Click **"Save"**

---

### **Step 5: Redeploy Frontend**

1. Go to **Deployments** tab in Vercel
2. Click **"Redeploy"** on the latest deployment
3. **Wait for deployment** (2-3 minutes)

---

## 🎊 **Test Your App!**

Your app will be live at: **https://chatapp-[random].vercel.app**

Test it:
1. ✅ Sign up with a new account
2. ✅ Sign in
3. ✅ Create a room
4. ✅ Send messages
5. ✅ Open in another browser/tab and verify real-time messaging works!

---

## ⚠️ **Important Notes:**

### **Free Tier Limitations:**

**Render.com (Backends):**
- 🟢 Free tier services **sleep after 15 minutes** of inactivity
- 🟡 First request after sleep takes **30-60 seconds** to wake up
- ✅ Good for demos and learning projects

**Vercel (Frontend):**
- 🟢 **Always active**, no sleeping
- ✅ Completely free for hobby projects

### **To Keep Backends Awake:**
Use a service like **UptimeRobot** or **cron-job.org** to ping your backends every 10 minutes.

---

## 🔒 **Security Reminder:**

**Change the JWT_SECRET!** 

Generate a strong random secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Update it in both Render services' environment variables.

---

## 📚 **Useful Links:**

- **Frontend (Vercel):** https://vercel.com/plakshashris-projects/chatapp
- **GitHub Repo:** https://github.com/NischayRathi/chat-app-mono
- **Render Dashboard:** https://dashboard.render.com
- **Neon Database:** https://console.neon.tech

---

## 🐛 **If Something Doesn't Work:**

1. Check Render logs for backend errors
2. Check Vercel logs for frontend errors
3. Verify environment variables are set correctly
4. Make sure backend URLs use `https://` and `wss://` (not `http://` or `ws://`)
5. Wait 60 seconds if backends are sleeping

---

**You're almost done! Just follow Steps 1-5 above and your app will be live! 🚀**
