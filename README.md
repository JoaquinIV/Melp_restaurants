<h1 align="center"> MELP API </h1>
 
<div style="display: flex; justify-content: center; margin-bottom: 20px;">
    <img src="https://img.shields.io/badge/Framework-Express-blue" style="margin-right: 10px;">
    <img src="https://img.shields.io/badge/Database-PostgreSQL-red">
</div>


> Author: Valente Ignacio

> Email: ignaciovlnt@gmail.com

## Table of contents

* [Project description](#project-description)

* [Requirements](#requirements)

* [Implementation of the project](#Implementation-of-the-project)

* [Api Doc](#Api-doc)

* [Postman](#Postman)

* [Technologies used](#Technologies-used)

---

### Project description
Basic REST API for restaurants. Contains the CRUD along with an enpoint to perform a statistics query based on a circular area determined by the longitude, latitude and radius of the same.

### Requirements
- Have docker installed on your computer. (https://docs.docker.com/engine/install/)

- Have docker-compose installed. (https://docs.docker.com/compose/install/)

### Implementation of the project
1. Clone the project on your computer in the directory of your choice.

2. Create the .env file with the following environment variables
```
PORT=3000 (Default value 3000)
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_USER=postgresuser
POSTGRES_DB=postgres
``` 

3. Update the environment variables inside the docker-compose.yml file to have the same value as the environment variables defined in the .env file.

4. Within the Dockerfile update the exposed port if necessary to be the same as the environment variable defined in the .env file.

5. Inside the directory containing the project run the following command docker-compose up

6. The corresponding database and api containers are initialised for testing.

### Api Doc
Apidoc is a tool that generates api documentation for node projects (see [Apidoc](https://apidocjs.com/)). 

The project displays the documentation as static files if you open the server root http://localhost:3000 in a browser.

The documentation is also generated in markdown format.

### Postman
The Melp.postman_collection.json file represents a collection which can be used in Postman to test the project.

### Technologies used
<img src="https://img.shields.io/badge/Backend-Express-blue">
<img src="https://img.shields.io/badge/Backend-Node-green" style="margin-right: 10px;">
<img src="https://img.shields.io/badge/Database-PostgreSQL-red">
<img src="https://img.shields.io/badge/Database-PostGIS-yellow">
