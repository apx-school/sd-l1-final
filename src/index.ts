import minimist from "minimist"; // Importamos minimist para parsear los argumentos
import { PelisController } from "./controllers"; // Importamos la clase PelisController

function parseaParams(argv) { // Creamos la funcion para parsear los argumentos que recibe los parametros desde node
  const resultado = minimist(argv); // Usamos minimist para parsear los argumentos
  return resultado; // Y retornamos el resultado
}

async function main() { // Creamos la funcion main
  const params = parseaParams(process.argv.slice(2)); // Hacemos el parseo de los parametros desde la posicion 2 cortada con slice
  const pController = new PelisController; // Instanciamos la clase controller de pelis

  const command = params._[0]; // Accedemos a las propiedades que no tienen flag como 'search', 'add', 'get'

  if (command === 'add') { // Si el command es igual a add
    const peli = { // Creamos un objeto literal y creamos todas las propiedades necesarias
      id: params.id,
      title: params.title,
      director: params.director,
      year: params.year,
      tags: Array.isArray(params.tags) ? params.tags : [params.tags], // Valida si params.tags es un array. En caso afirmativo, le da el valor de params.tags, si no, lo convierte en un array
      duration_minutes: params.duration_minutes,
    };
    const result = await pController.add(peli); // Esperamos el resultado de el metodo add del controller con la peli
    console.log(result); // Imprimimos el resultado
    return; // Terminamos la funcion
  }

  if (command === 'get') { // Si el command es igual a "get"
    const result = await pController.get({id: params._[1]}); // Esperamos el resultado del metodo get con el id pasado en los parametros
    console.log(result); // Imprimimos el resultado
    return; // Terminamos la funcion
  }

  if (command === 'search') { // Si command es igual a "search"
    if(params.title && params.tag){ // Valida si params.title y params.tag existen 
      const result = await pController.get({search: {title: params.title, tag: params.tag}}); // Espera el resultado de get con title y tag como parametros
      console.log(result);
      return;
    }

    if (params.title) { // Y si los parametros tienen un title
      const result = await pController.get({ search: { title: params.title } }); // Esperamos el resultado del get con search {y el valor de title} como parametro
      console.log(result); // Mostramos el resultado
      return; // Terminamos la funcion
    }

    if (params.tag) { // Si por otro lado, los parametros tienen tag
      const result = await pController.get({ search: { tag: params.tag } }); // Esperamos el resultado del get con search {y el valor de tag} como parametro
      console.log(result); // Mostramos el resultado
      return; // Terminamos la funcion
    }
  }

  console.log(await pController.get());
  return;
}

main();