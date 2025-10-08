#!/bin/bash

echo "🚀 Deploying Draw App to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    pnpm add -g vercel
fi

# Deploy the web app
echo "📦 Deploying frontend to Vercel..."
cd apps/web
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "⚠️  Remember to deploy your backends separately:"
echo "   - HTTP Backend (apps/http-backend)"
echo "   - WebSocket Backend (apps/ws-backend)"
echo ""
echo "Recommended platforms: Railway, Render, or DigitalOcean"
echo "See DEPLOYMENT.md for detailed instructions"
