# ----------------------
# Stage 1: Build
# ----------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Accept NEXTAUTH_SECRET at build time
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Build the Next.js app
RUN npm run build

# ----------------------
# Stage 2: Runtime
# ----------------------
FROM node:20-alpine AS runner
WORKDIR /app

# Accept NEXTAUTH_SECRET in runtime stage and expose it as ENV
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Copy built app and necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./ 
COPY --from=builder /app/tsconfig.json ./ 

# Default environment variables (can be overridden in docker-compose)
ENV PORT=3000
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_URL=http://localhost:5000

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
