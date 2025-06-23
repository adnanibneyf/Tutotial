# Use a slim Node image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (leverage Docker cache)
COPY package*.json ./
RUN npm install

# Copy Prisma schema & generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy rest of the code
COPY . .

# Expose your app’s port
EXPOSE 4000

# Start the server (uses ts-node-dev for live reload; swap for "node dist/index.js" if you compile)
CMD ["npm", "run", "dev"]
