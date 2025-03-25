
## Como correr el backend

Instalar dependencias
```bash
npm install
```
Correr el proyecto
```bash
npm run start:dev
```
Para correr el test

```bash
npm run test
```
## Deplegar en docker

Cambia .env a .env.example
`mv .env.example .env`

Se crea la imagen
 `docker build -t pruebaback .`

Se crea el contenedor
  `docker run -p 4000:4000 pruebaback`