# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build arguments
ARG VITE_API_BASE_URL=http://localhost:8080

# Set environment variables for build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 5173

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

