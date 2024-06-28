# Use the official Node.js image.
FROM node:lts-alpine

# Set the working directory.
WORKDIR /frontend/src

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Define the command to run the application.
CMD ["node", "index.js"]
