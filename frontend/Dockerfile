# Stage 1: Build the React app (common for prod and test)
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image with Nginx (unchanged)
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# New Stage 3: Test image with Node.js for running tests
FROM node:20 AS test
WORKDIR /app
COPY package*.json ./
RUN npm install  # Install dev dependencies
COPY . .
CMD ["npm", "test", "--", "--ci"]
