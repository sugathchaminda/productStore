# Use Node v11.2 as the base image.
FROM node:14

#Set the working directory
WORKDIR /usr/app
COPY .npmrc .npmrc  

COPY package*.json ./
   
# Copy everything in current directory to /server folder
# ADD . /server

# Install dependencies
RUN npm install

RUN rm -f .npmrc

COPY . .

EXPOSE 3000

# Run node 
ENTRYPOINT ["yarn","server:dev"]
 