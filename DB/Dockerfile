# Usa la imagen oficial de PostgreSQL como base
FROM postgres:15

# Copia el archivo SQL al contenedor
COPY Sentencias.sql /docker-entrypoint-initdb.d/

# Configura las variables de entorno para PostgreSQL
ENV POSTGRES_DB=felipedb
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=prueba123

# Exponer el puerto de PostgreSQL
EXPOSE 5432