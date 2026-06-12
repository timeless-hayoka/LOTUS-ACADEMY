FROM node:24-slim

# Install flite and other dependencies
RUN apt-get update && apt-get install -y \
    flite \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9091

CMD ["node", "index.js"]
