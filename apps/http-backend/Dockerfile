FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all packages
COPY packages ./packages
COPY apps/http-backend ./apps/http-backend

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm --filter http-backend build

# Set working directory to the app
WORKDIR /app/apps/http-backend

# Expose port
EXPOSE 3001

# Start
CMD ["node", "./dist/index.js"]
