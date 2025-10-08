FROM node:20-alpine

WORKDIR /app

# Copy root package files from parent directory
COPY ../../package.json ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./

# Copy packages from parent
COPY ../../packages ./packages

# Copy this backend
COPY . ./apps/ws-backend

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN pnpm --filter @repo/db exec prisma generate

# Build WS backend
RUN pnpm --filter ws-backend build

# Expose port
EXPOSE 8080

# Start from ws-backend directory
WORKDIR /app/apps/ws-backend
CMD ["node", "./dist/index.js"]
