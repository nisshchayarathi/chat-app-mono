FROM node:20-alpine

WORKDIR /app

# Copy root package files from parent directory  
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./

# Copy packages from parent
COPY ../../packages ./packages

# Copy this backend
COPY . ./apps/http-backend

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN pnpm --filter @repo/db exec prisma generate

# Build HTTP backend
RUN pnpm --filter http-backend build

# Expose port
EXPOSE 3001

# Start from http-backend directory
WORKDIR /app/apps/http-backend
CMD ["node", "./dist/index.js"]
