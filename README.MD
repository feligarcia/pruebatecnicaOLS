### Proyecto Prueba Tecnica por Juan Felipe Garcia

Este es el repositorio para un el proyecto Prueba tecnica por Juan F Garcia

Consta de 3 carpetas:
- DB: base de datos y archivos necesarios para la generación de la base de datos postgreSQL en docker.
- UI: frontend en nextjs.
- BACK: backend API REST en nestjs

### Correr proyecto completo
Usar docker-compose.yml para correr el proyecto completo, en 3 contenedores.
`docker compose up -d`


### DB
Se tiene un Dockerfile para generar la base de datos y el contenedor
Mas info: ([DB informacion](https://github.com/feligarcia/pruebatecnicaOLS/tree/main/DB))

### Back
Se tiene un Dockerfile para leer la base de datos y el contenedor.
Es necesario que este corriendo la base de datos para poder generar la imagen y correr contenedor, se recomienda usar el docker-compose.yml
Mas info: ([BACK informacion](https://github.com/feligarcia/pruebatecnicaOLS/tree/main/BACK))

#### Documentación
Documentación de la API REST, en una colección postman:
https://documenter.getpostman.com/view/18839533/2sAYkHoe45

- Prueba unitaria en src/comerciantes/comerciantes.spec.ts 
    Ejecutar prueba unitaria con `npx jest`

### UI
Se tiene un Dockerfile para generar la imagen y crear el contenedor
Mas info: ([UI informacion](https://github.com/feligarcia/pruebatecnicaOLS/blob/main/UI))
