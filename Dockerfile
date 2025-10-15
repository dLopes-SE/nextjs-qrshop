# Install dependencies and build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Accept build-time ARG
ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Build the Next.js app
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

ENV PORT=3000
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_URL=http://localhost:5000

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
