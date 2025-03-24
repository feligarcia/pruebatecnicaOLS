FROM postgres:15


COPY Sentencias.sql /docker-entrypoint-initdb.d/


ENV POSTGRES_DB=felipedb
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=prueba123


EXPOSE 5432