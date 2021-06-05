# Desafío del módulo 2

Lista de Comandos para Utilizar la Base de Datos de Películas:

ts-node index.ts
    -Devuelve la base de datos completa

ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic
    -Agrega una película a la base de datos siempre que el número "id" no exista previamente, sino devuelve 'false'.
    -Debe indicarse siempre un "id", un "title" y al menos un "tags" para agregar la película.
    -Si se agrega correctamente devuelve 'true'.

ts-node index.ts get 4411
    -Devuelve la película con el número "id" proporcionado.

ts-node index.ts search --title="x" --tag="action"
    -Devuelve las peliculas que contengan los valores proporcionados en "title" y en "tag".
    -Se puede utilizar title y tag individualmente o ambas al mismo tiempo.

