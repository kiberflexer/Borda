# Borda

## Запуск локально

1. Установить зависмости
    - [Nodejs](https://nodejs.org/en/)
    - [Postgres](https://www.postgresql.org/download/) или [Docker](https://docs.docker.com/engine/install/)

2. Подготовить базу данных

    npx prisma db push
    npx prisma generate

3. Запустить сервер

    npm run dev

## Run the app in production mode

    npm build

Make sure to deploy the output of `remix build`
- `build/`
- `public/build/`

Run app

    npm start

## Как запустить `postgres` в контейнере `docker`

- Установить [Docker](https://docs.docker.com/engine/install/)

- Запустить контейнер

    ```shell
    docker pull postgres:alpine
    docker run --name POSTGRES -p 5432:5432 -e POSTGRES_PASSWORD=randomPassword -d postgres:alpine
    ```

## Как подключиться к `postgres` через `pgweb`

- Скачать образ и запустить котейнер

    ```shell
    docker pull pgweb
    docker run docker run --name PGWEB -p 5433:8081 -d sosedoff/pgweb
    ```

- Создать сеть и присоеденить к ней оба контейнера
  
    ```shell
    docker network create POSTGRES_NETWORK
    docker network connect POSTGRES_NETWORK POSTGRES
    docker network connect POSTGRES_NETWORK PGWEB
    ```

- Перейти по ссылке http://localhost:5433

## Полезные материалы

- [Prisma guide](https://www.youtube.com/watch?v=RebA5J-rlwg)
- [Remix crash course](https://www.youtube.com/watch?v=d_BhzHVV4aQ)
- [Remix/React state guide](https://www.youtube.com/watch?v=sFTGEs2WXQ4)
- [Remix routing](https://www.youtube.com/watch?v=ds_evK0jeHM)
- [Remix examples](https://github.com/remix-run/remix/tree/main/examples)
