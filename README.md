# message_passer

# Start Server

## In Docker
1. go to where docker is located: `cd repo-name` 
1. build docker image from dockerfile: `docker build -t message-passer:latest .`
1. spin up docker container from the image (starts server too): `docker container run -it -p 3000:3000 message-passer:latest`
3. go to front end: `http://localhost:3000/`

### Troubleshooting
* see running container: `docker container ls`
* see built images: `docker image ls`
* open shell inside running container and map FE running in container to your local
 
``` 
docker container run -it -p 3000:3000 message-passer:latest` 
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