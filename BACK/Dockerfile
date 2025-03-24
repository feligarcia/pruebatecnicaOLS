# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install Prisma CLI globally (if not already installed in your project)
RUN npm install -g prisma

# Generate Prisma client
RUN npx prisma generate

# Run Prisma migrations to initialize the database
RUN npx prisma migrate deploy

# Expose the application port
EXPOSE 4000

# Command to run the application
CMD ["node", "dist/main"]