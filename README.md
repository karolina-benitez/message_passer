# Table of Contents

1. [Setup dev environment on Local](#setup-dev-environment-on-local)
2. [Setup dev environment in Docker](#setup-dev-environment-in-docker)

# Message Passer App
This app does X, Y Z.
Its FE is built in React, the BE uses Express Nodejs and it stores data in postgres.

## Getting Started
You can setup a development environment on your local computer or inside a docker container.

### Setup dev environment on Local 
1. Install npm: `npm install npm@latest -g`  
1. Install nodemon: `npm install -g nodemon`  
1. Fork and clone your forked repo `$ git remote add upstream git@github.com:karolina-benitez/message_passer.git`  

#### Set up Back End
1. Run npm install to get all the necessary dependencies:  
```
$ cd server  
$ npm install
```
#### Start BE server  
`$ npm start`  
if an error occurs, make sure you correctly installed nodemon.  

#### Set up Database
1. Install Postgres  
```
$ brew install postgres  
$ brew services start postgresql  
$ psql postgres  
$ CREATE DATABASE messagepasserdb;  
$ \c messagepasserdb  
$ CREATE TABLE messages(  
  id serial PRIMARY KEY,  
  messageBody VARCHAR (1000) NOT NULL,  
  messageURL VARCHAR (1000) NOT NULL  
);
```
#### Set up Front End
1. run npm install to get all the necessary dependencies:
```
$ cd client  
$ npm install  
```
#### Start FE server  
`$ npm start`

### Setup dev environment in Docker
1. Install [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
1. Go into the repo directory: `cd [repo_name]` 
1. build docker image from dockerfile: `docker build -t message-passer:latest .`
1. spin up docker container from the image (starts server too). 
And map the FE port running in the container to your local port so you can see the FE. 
And bind mount your local repo to the repo in the container so local changed are reflected on FE. 
```
docker container run -it -p 3000:3000 -v "$(pwd)":/app message-passer:latest
```
3. go to front end: `http://localhost:3000/`

#### Troubleshooting
* clean up old docker containers and images to free up space on your mac: `docker system prune`
* see running container: `docker container ls`
* see built images: `docker image ls`
* open shell inside a running container so you can debug files inside the container or run commands 
 
``` 
docker container exec -it [container-name or id] sh  
```
* spin up container and open a shell to it (overriding CMD in dockerfile):
``` 
docker container run -it -p 3000:3000 message-passer:latest sh` 
```
* stop container: `docker container stop` 
