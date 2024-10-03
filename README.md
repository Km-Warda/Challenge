# The Application
- #### The Backend `API` written in Laravel-PHP, and listens on port 8000.
- #### The Frontend `CLIENT` written in Nuxt.js, and listens on port 3000.
- #### Nginx Server as a proxy server, and listens on Https port.
- #### GitHub action as a CICD tool
![image](https://github.com/user-attachments/assets/c414f3b1-fa85-466e-b6f8-0c050474a7cf)


#  Application Images
- Docker files are created in the `./api` & `./client` for the backend & frontend respectively.
- docker-compose.yaml file starts the images {database, api, client, nginx}

# Steps To start the application
### Setting up the environment
- Create an `.env` file, in he same directory as `docker-compose.yaml file`
- Put your own credentials to the database and variables in the `env` file, for this testing use simple configuration as the following example:
```
# Database (MySQL) environment variables
MYSQL_ROOT_PASSWORD=root_password
MYSQL_HOST=127.0.0.1
MYSQL_DATABASE=bookapi
MYSQL_USER=app
MYSQL_PASSWORD=password

# Laravel (API) environment variables
DB_CONNECTION=mysql
DB_PORT=3306
DB_DATABASE=bookapi
DB_USERNAME=app
DB_PASSWORD=password
```

### NginX (Proxy Server)
NginX setup to redirect http requests of the application DNS to https requests,,,

- Add your DNS to the `nginx/default.conf`, for this testing add it to the server hostnames as the following example:
```
echo "127.0.0.1    bookapi" >> /etc/hosts
```
![image](https://github.com/user-attachments/assets/77ae0768-4a30-4338-a7b2-26b8d978df23)
- Add or create your own certificate in the `nginx/cert` file
- The certificate is in the `.gitignore file`
```
openssl req -x509 -nodes -days 365 -newkey rsa:2048   -keyout ./nginx/certs/nginx-selfsigned.key   -out ./nginx/certs/nginx-selfsigned.crt   -subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"
```
- make sure that your certificate is the one in the `nginx/default.conf`
![image](https://github.com/user-attachments/assets/1a9dbf15-ea04-4698-98fe-48e712b487cc)
- Start the compose file
```
docker-compose up --build
```
## Accessing the Application
- WE can acces the application through our DNS. HTTP requests are seamlessly redirected to HTTPS. The DNS used is `https://bookapi` in this case
  ![GIF](https://github.com/user-attachments/assets/64a7e26b-e348-442f-9f97-37bfb5388ed0)

- You can also check the client, api, & db containers are up with no errors at the buttom from `localhost:3000` 
- You can check for the migrated tables form `api` as well, this is done via the `./api/docker-entrypoint.sh` script.
![Pasted image 20240928195941](https://github.com/user-attachments/assets/1198663a-7e1b-4831-b2ed-bfb679cbb186)

## CICD using GitHub Actions
- The pipeline will run automatically when any updates occur on the main branch for the repository
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
- GitHub Actions & The images on the Docker-Hub
![image](https://github.com/user-attachments/assets/22f909f4-5bb6-4d92-a9ba-ef5063cfa793)


# Troublshooting
## Migration Error
- If you ecountered error 500 from the api, probably the migration process for the tables happened before the mysql engine fully boots, this may happen due to short hardware resources or network problem.
- To fix this increse the wait time in the `./api/docker-entrypoint.sh` script
```
wait 40
```
## NginX not forwarding traffic as expected
- Make sure the DNS used in `nginx/default.conf` either a valid domain name or in the hosts file with ip similar as that of your localhost one.

## [GET] "http://api:8000/api/books": 500 Internal Server Error
- MYSQL DB container isn't reachable or has some issues.
## [GET] "http://api:8000/api/books": <no response> fetch failed
- api Backend contaier isn't reachable or has some issues.

## Notes: 
- The client [POST] requests are still on development, entries can't be added from the front-end but can be done through accessing mysql db, and would appear as the [GET] requests are fine.
![WhatsApp Image 2024-09-28 at 23 53 55_256c8862](https://github.com/user-attachments/assets/eb461731-2c1e-4cfc-8d5c-0f967c8ac5ee)
![WhatsApp Image 2024-09-28 at 23 54 45_bfaa1915](https://github.com/user-attachments/assets/daed75c7-efd6-4f0a-9564-0b257073f14f)
