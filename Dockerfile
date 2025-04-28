FROM node:18-alpine
WORKDIR /app
# Copy only manifest files; package-lock.json optional
COPY package*.json ./
# If package-lock.json exists, npm ci uses it; otherwise npm install is used
RUN npm install --only=production
COPY . .
CMD ["node", "server.js"]
