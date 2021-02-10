FROM mysql

ENV MYSQL_ROOT_PASSWORD Task123
ENV MYSQL_DATABASE taskitDb

COPY ./00.up.sql /docker-entrypoint-initdb.d/
