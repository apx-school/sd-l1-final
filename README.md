# Desafío del módulo 2

Este proyecto consistía en un pequeño programa para gestionar películas en una base de datos local, mediante POO e implementando el patrón MVC para organizar el código. Está realizado en TypeScript.

Los requisitos:
- Forkear este repo
- Revisars los tests
- Agregá tu código y asegurate que los tests pasen
- Creá un PR y subí tu PR validado a la sección [Mis desafíos](https://apx.school/challenges)


** Ejemplos de comandos para probar el código **

ts-node index.ts get '{"id":4}'

ts-node index.ts search --title="a"

ts-node index.ts search --tag="comedia"

ts-node index.ts search --title="an" --tag="familiar"

ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic

ts-node index.ts (este último comando debe devolver todas las películas)
