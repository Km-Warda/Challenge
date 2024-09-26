# Use Node.js official image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy the app code
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

CMD ["npm", "run", "start"]
