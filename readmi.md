ts-node index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic
{
\_: [ 'add' ],
id: 4411,
title: 'Título de la nueva peli',
tags: [ 'action', 'classic' ]
}

ts-node index.ts get 4411
{ \_: [ 'get', 4411 ] }

ts-node index.ts search --title="a"
{ \_: [ 'search' ], title: 'a' }

ts-node index.ts search --tag="classic"
{ \_: [ 'search' ], tag: 'classic' }

ts-node index.ts search --title="x" --tag="action"
{ \_: [ 'search' ], tag: 'classic' }

ts-node index.ts (este último comando debe devolver todas las películas)
{ \_: [] }
