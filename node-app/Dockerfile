FROM node:15.5.0

# Create app directory
WORKDIR /usr/src/node-app

# Install app dependencies
# A wildcard ("*") is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# The first "." means local directory. For example in this case: "Dockerfile  node_modules  package.json  package-lock.json  server.js" (I can check this info using cmd "ls ."
# The second "." means where it will copy into. For example in this case: "/usr/src/node-app"
COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]