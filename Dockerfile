# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add app
COPY . ./
WORKDIR /app/client

# install dependcies.
RUN npm install

# start app
CMD ["npm", "start"]