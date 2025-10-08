FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all packages
COPY packages ./packages
COPY apps/ws-backend ./apps/ws-backend

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm --filter ws-backend build

# Set working directory to the app
WORKDIR /app/apps/ws-backend

# Expose port
EXPOSE 8080

# Start
CMD ["node", "./dist/index.js"]
