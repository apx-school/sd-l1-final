# Sistema de Gestión de Películas

Una aplicación de terminal para gestionar y buscar películas almacenadas en un archivo JSON.

Comandos Disponibles

1. Ver todas las películas
npx tsx src/index.ts


2.Buscar película por ID
npx tsx src/index.ts get [ID]


**Ejemplo:**
npx tsx src/index.ts get 1"


3.Buscar películas por título
npx tsx src/index.ts search --title=[TITULO]


**Ejemplo:**
npx tsx src/index.ts search --title=batman

4.Buscar películas por tag

npx tsx src/index.ts search --tag=[TAG]

**Ejemplo:**
npx tsx src/index.ts search --tag=drama"

5.Buscar películas por título Y tag (combinado)
npx tsx src/index.ts search --title=[TITULO] --tag=[TAG]

## Ejecutar Tests

npm test
