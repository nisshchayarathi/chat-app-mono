FROM node:20-alpine

WORKDIR /app

# Copy everything from repo root (Railway sets context to repo root)
COPY . .

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client (CRITICAL!)
RUN pnpm --filter @repo/db exec prisma generate

# Build WS backend
RUN pnpm --filter ws-backend build

# Expose port
EXPOSE 8080

# Start WebSocket backend
CMD ["node", "apps/ws-backend/dist/index.js"]
