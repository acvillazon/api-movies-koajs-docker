# [API Movie](https://blooming-headland-83797.herokuapp.com/)

API Movie, es un microservicio, el cual cuenta con 3 servicios diferentes enfocados en realizar operaciones sobre datos de contenido multimedia (Series y Peliculas).
La solución fue construida con NodeJs, usando su framework KoaJS. Ademas usa tecnologia de contenedores usando Docker.
Y cuenta con una pequeña base de datos No relational, la cual fue construida en mongoDB 
Los servicios son los siguientes

1.	Buscador de películas:

**Método GET** Path:/movies/:movie
- El valor a buscar debe ir en la URL de la API
- Adicionalmente puede ir un header opcional que contenga el año de la película.
- Almacenar en una BD Mongo, la siguiente info:

    Title
    Year
    Released
    Genre
    Director
    Actors
    Plot
    Ratings

- El registro de la película solo debe estar una vez en la BD.
- Devolver la información almacenada en la BD.


2.	Obtener todas las películas: Path:/movies

**Método GET**
- Se deben devolver todas las películas que se han guardado en la BD.
- Si hay más de 5 películas guardadas en BD, se deben paginar los resultados de 5 en 5
- El número de página debe ir por header.

3.	Buscar y reemplazar: Path:/movies
- Método POST que reciba en el BODY un object como: P.E: {movie: star wars, find: jedi, replace: CLM Dev }
- Buscar dentro de la BD y obtener el campo PLOT del registro
- Al string del plot obtenido buscar la palabra enviada en el Body (find) y reemplazar todas sus ocurrencias por el campo enviado en el body (replace)
- Devolver el string con las modificaciones del punto anterior

## Construido con 🛠️

* [Docker](https://www.docker.com/)
* [Node: 14](https://nodejs.org/en/)
* [KoaJs](https://koajs.com/)
* [MongoDb](https://www.mongodb.com/es)
* [API de películas OMDB](http://www.omdbapi.com/)

### Pre-requisitos 📋

Para poner en marcha el proyecto debemos tener instalado.

```
Docker
Docker Swarm (Optional)
NodeJS
```

### Instalación 🔧

Luego de descargar el código fuente. 
Debemos construir la imagen del proyecto usando Docker y luego ejecutarla.

Para lo anterior debemos ejecutar mediante linea de comando los siguientes comandos (desde la raiz del proyecto)

```
docker build -t CONTAINER_NAME .
docker run -p PORT_TO_EXPOSE:8090  CONTAINER_NAME
```

Una vez ejecutado con exito lo anterior nuestra imagen debe estar creada y iniciada.

Si queremos verificar nuestras imagenes creadas, nos basta con ingresar el siguiente comando mediante linea de comando
```
docker images
```
Y con el siguiente comando podremos observar el estado de nuestro/nuestros contenedores.
```
docker ps -a
```
El puerto correspondiente en el cual será ejecutada la aplicacion es el siguiente.
```
API : http://localhost:PORT_TO_EXPOSE
API in Heroku: https://blooming-headland-83797.herokuapp.com/ (Api corriendo sobre el servicio de heroku)
```

### Ejecución con Docker Swarm (Opcional) 🔧

Si queremos ejecutarlo usando Docker Swarm ejecutamos lo siguiente
```
docker swarm init
docker stack deploy -c docker-compose-swarm.yml api
```

Si queremos verificar el estado de los servicios/tareas de docker swarm
podemos ejecutar mediante linea de comando lo siguiente:

```
docker service ls
docker ps ls
```

El puerto correspondiente en el cual será ejecutada la aplicacion es el siguiente. (Usando Swarm)
```
API : http://localhost:3000
```

* **Andrés Villazon** - [acvillazon](https://github.com/acvillazon)