# Use Node v11.2 as the base image.
FROM node:14

#Set the working directory
WORKDIR /usr/app
COPY .npmrc .npmrc  

COPY package*.json ./
COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh 

# Install dependencies
RUN npm install

RUN rm -f .npmrc

COPY . .

EXPOSE 3000

# Run node 
CMD /wait-for-it.sh db:3306 -- yarn server:dev

# ENTRYPOINT ["yarn","server:dev"]
 