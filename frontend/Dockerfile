# Stage 1: Builder (installs deps and builds the React app)
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies (leverage caching)
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Test (for running npm test in a container; copies from builder)
FROM node:20-alpine AS test

WORKDIR /app

# Copy built artifacts and deps from builder
COPY --from=build /app /app

# Command to run tests
CMD ["npm", "test", "--", "--ci"]

# Stage 3: Production (lean Nginx image for serving)
FROM nginx:alpine AS production

# Pre-create /run/nginx with broad permissions (run as root)
RUN mkdir -p /run/nginx && \
    chmod -R 755 /run/nginx

# Pre-create cache directories with broad permissions
RUN mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/fastcgi_temp /var/cache/nginx/uwsgi_temp /var/cache/nginx/scgi_temp /var/cache/nginx/proxy_temp && \
    chmod -R 755 /var/cache/nginx

# Copy built static files from builder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod 644 /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Healthcheck (simple ping to ensure Nginx is serving)
HEALTHCHECK --interval=30s --timeout=3s CMD wget --no-verbose --quiet --tries=1 --spider http://localhost/ || exit 1

# Run Nginx as root for permission reliability in production
CMD ["nginx", "-g", "daemon off;"]
