# Install dependencies and build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Run production server
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only what we need for production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./ 
COPY --from=builder /app/tsconfig.json ./ 

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
