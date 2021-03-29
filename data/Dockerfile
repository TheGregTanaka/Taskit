FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD Task123
ENV MYSQL_DATABASE taskitDb

COPY ./00.up.sql /docker-entrypoint-initdb.d/
COPY ./01.up.sql /docker-entrypoint-initdb.d/
COPY ./02.up.sql /docker-entrypoint-initdb.d/
COPY ./03.up.sql /docker-entrypoint-initdb.d/
