
### running the project
- First you need start the mysql running the following command at project folder
`docker-compose up --build mysql`

- then create the database that will be used on this project
`docker exec -i mysql  mysql -uroot -pserver -e 'create database test'`

- now run start all micro services with `docker-compose up --build -d`

- you can find all request to test on `request.http` file