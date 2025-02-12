import * as minimist from "minimist";
import { PelisController } from './controllers'; // Importa el controlador

function parseaParams(argv: string[]) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController(); // Instancia del controlador

  if (params._[0] === 'get') {
    // Si el primer argumento es 'get'
    const id = params._[1]; // Obtiene el id de la película
    const options = id ? { id: Number(id) } : {}; // Crea un objeto de opciones
    const pelis = await controller.get(options); // Llama al método get del controlador
    console.log(pelis); // Muestra las películas obtenidas
  } else if (params._[0] === 'add') {
    // Si el primer argumento es 'add'
    const newPeli = {
      id: params.id,
      title: params.title,
      tags: params.tags ? params.tags.split(',') : [] // Convierte los tags en un array
    };
    const result = await controller.add(newPeli); // Llama al método add del controlador
    console.log(result ? 'Película agregada con éxito' : 'Error al agregar la película');
  } else if (params._[0] === 'search') {
    // Si el primer argumento es 'search'
    const options = {
      search: {
        title: params.title,
        tag: params.tag
      }
    };
    const pelis = await controller.get(options); // Llama al método get del controlador
    console.log(pelis); // Muestra las películas encontradas
  } else {
    console.log('Comando no reconocido. Usa "get", "add" o "search".');
  }
}

main();
