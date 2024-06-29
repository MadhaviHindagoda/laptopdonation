#Use the official Node.js 18 image as base
FROM node:18

# Set the working directory for the backend
WORKDIR /usr/src/backend

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend application
COPY . .

# Expose port  to the outside world
EXPOSE 3001


# Command to run the backend application
CMD ["npm", "run", "server"]