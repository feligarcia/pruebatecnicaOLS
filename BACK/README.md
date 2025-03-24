
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

Se crea la imagen
 `docker build -t pruebaBack .`

Se crea el contenedor
  `docker run -p 4000:4000 pruebaBack`