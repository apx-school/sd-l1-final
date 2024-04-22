//minimist es una librería que facilita el análisis de argumentos de línea de comando. Esta importación permite usar minimist para interpretar los argumentos que se pasen al script.
import minimist from "minimist";

import { PelisController } from "./controllers";
//parseaParams es una función diseñada para analizar los argumentos pasados al script. argv es un array de argumentos de línea de comando.
//minimist(argv) analiza estos argumentos y los convierte en un objeto más manejable, almacenado en resultado.
//Se imprime el resultado del análisis para depuración, mostrando cómo minimist ha interpretado los argumentos.

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log("minimist", resultado);
  console.log(resultado._[0]);
  //resultado._ contiene los argumentos no asociados a opciones (sin guiones). resultado._[0] sería el primer argumento no opción, usado aquí para determinar la acción (add, get, search).
  //options es un objeto que captura opciones específicas para las acciones, como id, title, y tags. Estas se extraen directamente del objeto resultado de minimist.
  const params = {
    // add / get / search / no te viene nada minimist te devuelve un array vacio
    action: resultado._[0],
    options: {
      id: resultado.id || resultado._[1],
      title: resultado.title,
      tags: resultado.tags || resultado.tag,
    },
  };

  return params;
}
//main es una función asíncrona que orquesta la ejecución del script.
//parseaParams(process.argv.slice(2)) invoca parseaParams con los argumentos de línea de comando, excluyendo los dos primeros elementos que son el entorno de ejecución de Node y el nombre del script.
//Se crea una instancia de PelisController.
async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  //Basado en params.action, el script decide qué método del controlador llamar.
  //Si no se especifica una acción, se llama a controller.get() sin argumentos para obtener todas las películas.
  //Si la acción es add, se llama a controller.add con las opciones especificadas y se informa si la película fue agregada correctamente.
  //Si la acción es search, se realiza una búsqueda basada en los títulos y tags proporcionados.
  //Para cualquier otra acción (asumido aquí como obtener por id aunque no se especifica explícitamente como una acción get), se obtiene una película específica por su id.

  if (params.action === undefined) {
    console.log(await controller.get());
  } else {
    if (params.action === "add") {
      const seAgrego = await controller.add(params.options);
      seAgrego === true
        ? console.log("Se agrego correctamente.")
        : console.log("No se pudo agregar.");
    } else if (params.action === "search") {
      console.log(
        await controller.get({
          search: { title: params.options.title, tag: params.options.tags },
        })
      );
    } else {
      console.log(await controller.get({ id: params.options.id }));
    }
  }
}

main();
