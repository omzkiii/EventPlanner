# src/Dockerfile
FROM node:22-bullseye-slim

WORKDIR /app

# helpful envs for dev
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=500

# copy package manifests and install deps at build time
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# copy source (will be overlayed by compose mount in dev)
COPY . .

EXPOSE 3000

# rely on package.json dev script
CMD ["npm", "run", "dev"]
