# How to launch PostgerSQL

## Запуск в `Docker` контейнере

1. Установить [Docker](https://docs.docker.com/engine/install/)

1. Скачать образ

    ```shel
    docker pull postgres:alpine
    ```

1. Запустить контейнер

    ```shel
    docker run --name POSTGRES -p 5432:5432 -e POSTGRES_PASSWORD=randomPassword -d postgres:alpine
    ```

### Как подключиться к `PostgreSQL` c помощью `pgweb`

1. Скачать образ

    ```shell
    docker pull pgweb
    ```

1. Запустить котейнер

    ```shell
    docker run docker run --name PGWEB -p 5433:8081 -d sosedoff/pgweb
    ```

1. Создать виртуальну сеть

    ```shell
    docker network create POSTGRES_NETWORK
    ```

1. Присоеденить к созданной сети оба контейнера
  
    ```shell
    docker network connect POSTGRES_NETWORK POSTGRES
    docker network connect POSTGRES_NETWORK PGWEB
    ```

    >Теперь веб интерфейс `pgweb` должен быть доступен по адресу [http://localhost:5433](http://localhost:5433)

1. Для подключения выбрать URLShema и вставить URL базы данных, как указана в переменной DATABASE_URL в `.env` файле
