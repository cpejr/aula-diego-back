FROM node:alpine
WORKDIR /usr/src/server       # folder in the container
COPY ./package.json .
RUN npm install --only=prod   # install only production dependencies
COPY ./dist ./dist
EXPOSE 5000
CMD npm start
