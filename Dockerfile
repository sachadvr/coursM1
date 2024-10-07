# create a react app docker file with node latest image
# Pull the node image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json file
COPY package.json .

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the port
EXPOSE 3000
