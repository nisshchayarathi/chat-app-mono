# CORS Configuration Fix

## Problem

```
Access to XMLHttpRequest at 'http://localhost:3001/signin' from origin 'http://localhost:3000'
has been blocked by CORS policy: Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Root Cause

The CORS middleware was not properly configured to:

1. Accept requests from the frontend origin (http://localhost:3000)
2. Handle preflight OPTIONS requests
3. Include proper headers in the response

## Solution Applied

### 1. Updated HTTP Backend (`apps/http-backend/src/index.ts`)

Added proper CORS configuration with specific options:

```typescript
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
```

### 2. Added FRONTEND_URL to `.env`

```bash
FRONTEND_URL=http://localhost:3000
```

## What This Fixes

✅ Allows cross-origin requests from the frontend to the backend  
✅ Properly handles preflight OPTIONS requests  
✅ Includes `Access-Control-Allow-Origin` header in responses  
✅ Allows credentials (cookies, authentication headers)  
✅ Supports all required HTTP methods

## Testing

After restarting the dev server with `pnpm dev`, the frontend can now successfully make requests to:

- POST /signup
- POST /signin
- POST /room
- GET /chats/:roomId
- GET /room/:slug

## Configuration Details

| Option           | Value                           | Purpose                                  |
| ---------------- | ------------------------------- | ---------------------------------------- |
| `origin`         | `http://localhost:3000`         | Allows requests from frontend            |
| `credentials`    | `true`                          | Allows sending credentials with requests |
| `methods`        | GET, POST, PUT, DELETE, OPTIONS | HTTP methods to allow                    |
| `allowedHeaders` | Content-Type, Authorization     | Headers the browser can send             |

## For Production

When deploying, update `FRONTEND_URL` environment variable:

```bash
FRONTEND_URL=https://yourdomain.com
```

The backend will automatically use this for CORS configuration.
