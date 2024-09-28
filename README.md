# Application Deployment

- #### The Backend `API` written in Laravel-PHP, and listens on port 8000.
- #### The Frontend `CLIENT` written in Nuxt.js, and listens on port 3000.
- #### Nginx Server as a proxy server, and listens on Https port.
- #### GitHub action as a CICD tool

##  Application Images
- Docker files are created in the `./api` & `./client` for the backend & frontend respectively.
- docker-compose.yaml file starts the images {database, api, client, nginx}
## Steps To start the application
- Add or create your own certificate in the `nginx/cert` file
- The certificate is in the `.gitignore file`
```
openssl req -x509 -nodes -days 365 -newkey rsa:2048   -keyout ./nginx/certs/nginx-selfsigned.key   -out ./nginx/certs/nginx-selfsigned.crt   -subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"
```
- make sure that your certificate is the one in the `nginx/default.conf`
![Pasted image 20240927225035](https://github.com/user-attachments/assets/518bdc7b-5c93-4aa9-931e-d0f94bc622e4)
- Put the credentials in an `.env` file, in he same directory as `docker-compose.yaml file`
- Put your own credentials to the database, for this project we can use simple configuration as follows:
```
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=bookapi
MYSQL_USER=app
MYSQL_PASSWORD=password
DB_CONNECTION=mysql
DB_HOST=172.18.0.2
DB_PORT=3306
DB_DATABASE=bookapi
DB_USERNAME=app
DB_PASSWORD=password
```
- Start the compose file
```
docker-compose up --build
```

- Now the application is accessible through the web browser 
![Pasted image 20240928195342](https://github.com/user-attachments/assets/2bc01390-43ee-4793-9587-49f48884bc8c)
- You can check for the migrated tables as well, this is done via the `./api/docker-entrypoint.sh` script.
![Pasted image 20240928195941](https://github.com/user-attachments/assets/1198663a-7e1b-4831-b2ed-bfb679cbb186)

## Migration Error
- If you ecountered error 500, probably the migration for the tables happened before the mysql engine fully boots, this may happen due to short hardware resources or network problem.
- To fix this increse the wait time in the `./api/docker-entrypoint.sh` script
```
wait 30
```

## CICD using GitHub Actions
- The pipeline will run when any updates occur on the main branch for the repository
```
on:
  push:
    branches:
      - main
```
- Edit your GitHub repository secrets to contain your docker username & password
```
    - name: Log in to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
```
- Here is the full CICD configurations in `.github/workflows/docker.yml`
![Pasted image 20240927230638](https://github.com/user-attachments/assets/653cd3b7-6ba0-4901-b0bc-0d8f720f5a76)
