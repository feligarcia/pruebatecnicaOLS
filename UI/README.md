## UI

UI necesaria para conectar a back.

Para correr usar:
```bash
npm run dev
```

### Docker

Para correr en docker hay un Dockerfile
Se debe cambiar esta linea en el next.config.js
```
module.exports = {
  output: "standalone",
};
```
Se genera la imagen
`docker build -t pruebaUI .`

Se corre el contenedor
`docker run -p 3000:3000 pruebaUI`