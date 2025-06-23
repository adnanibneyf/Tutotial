# 1) Build stage
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2) Serve stage
FROM node:18-alpine
WORKDIR /usr/src/app

# Install a simple static server
RUN npm install -g serve

# Copy built files from the previous stage
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

# Serve the production build
CMD ["serve", "-s", "dist", "-l", "3000"]
