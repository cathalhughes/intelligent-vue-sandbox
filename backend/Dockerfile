FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the desired port (3000 in this case)
EXPOSE 3000

# Command to run the application using nodemon for hot reload
CMD ["npx", "nodemon", "server.js"]