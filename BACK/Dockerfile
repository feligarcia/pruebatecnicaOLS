# Usa una imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia archivos necesarios para la instalación
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el código de la aplicación
COPY . .

# Genera Prisma Client
RUN npx prisma generate

# Compila el código TypeScript
RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
