#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi


WORKING_DIR="$(cd "$(dirname "$0")" && pwd)"
PGADMIN_DATA_DIR=$WORKING_DIR/postgres/pgadmin
POSTGRES_DATA_DIR=$WORKING_DIR/postgres/data
NGINX_LOG_DIR=$WORKING_DIR/nginx/log

echo "Working dir $WORKING_DIR"
echo "Postgres admin dir $PGADMIN_DATA_DIR"

### NGINX log
if [ -d "$NGINX_LOG_DIR" ]; then
  rm -rf $NGINX_LOG_DIR
fi

### POSTGRES data
if [ -d "$POSTGRES_DATA_DIR" ]; then
  rm -rf $POSTGRES_DATA_DIR
fi

### PGAdmin
if [ -d "$PGADMIN_DATA_DIR" ]; then
  chmod -R 777 $PGADMIN_DATA_DIR
else
  echo "Creating dir $PGADMIN_DATA_DIR ..."
  mkdir -m777 $PGADMIN_DATA_DIR
  echo "Creating dir $PGADMIN_DATA_DIR done!"
fi



echo "---DONE---"
echo "---Let run docker compose---"