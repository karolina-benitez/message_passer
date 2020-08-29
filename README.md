# message_passer

# Start Server

## In Docker
1. go to where docker is located: `cd repo-name` 
1. build docker image from dockerfile: `docker build -t message-passer:latest .`
1. spin up docker container from the image (starts server too). 
And map the FE port running in the container to your local port so you can see the FE. 
And bind mount your local repo to the repo in the container so local changed are reflected on FE. 
```
docker container run -it -p 3000:3000 -v "$(pwd)":/app message-passer:latest
```
3. go to front end: `http://localhost:3000/`

### Troubleshooting
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

## On Local 
1. go to `cd message_passer/client`
2. start server: `npm start`
3. go to front end: `http://localhost:3000/`