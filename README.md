# Desafío del módulo 2

Para realizar este desafío aprendí sobre typescript, clases, herencias, test ava, asincronías y promesas, el mismo consistía hacer un archivo .json con información acerca de distintas películas y a través del  patrón de arquitectura de software MVC lograr que enviando desde la terminal distintos comandos esta me devuelva lo pedido. Los comandos que debían funcionar eran los siguientes:

- ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic
- ts-node index.ts get 4411
- ts-node index.ts search --title="a"
- ts-node index.ts search --tag="classic"
- ts-node index.ts search --title="x" --tag="action"
- ts-node index.ts (este último comando debe devolver todas las películas)

