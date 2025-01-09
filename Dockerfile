# Use the official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 5173

# Start the application using Vite's development server
Run rm -rf ./node_modules ./package-lock.json
RUN npm i 
CMD ["npm", "run", "dev"]