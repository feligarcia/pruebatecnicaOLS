## Pasos para generar imagen y contenedor

Genera la imagen
`docker build -t postgres-container .`

Genera el contenedor recuerda cambiar .env.example por tu .env
`docker run -d --name postgres_container -p 5432:5432 --env-file .env postgres-container`

Genera el contenedor con .env.example
`docker run -d --name postgres_container -p 5432:5432 --env-file .env postgres-container`