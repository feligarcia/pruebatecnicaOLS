## Para dev
Cambia de .env.example a .env
`mv .env.example .env`

Correr en modo dev
```
//Debes tener la base de datos corriendo
npm i // Instala las dependencias
npx prisma generate // Genera el cliente de prisma
npm start start:dev //correr en modo dev
```

## Pasos para generar imagen y contenedor

Cambia de .env.example a .env
`mv .env.example .env`

Genera la imagen
`docker build -t pruebadbimage .`

Genera el contenedor recuerda cambiar .env.example por tu .env
`docker run -d --name postgres_container -p 5432:5432 --env-file .env pruebadbimage`

Genera el contenedor con .env.example directamente
`docker run -d --name postgres_container -p 5432:5432 --env-file .env.example pruebadbimage`