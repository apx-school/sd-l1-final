import { PelisController } from "./controllers";
import * as minimist from "minimist";

// Objeto que mapea acciones a funciones del controlador.
const actionHandlers = {
  // Obtiene una película por su ID.
  get: (params, controller: PelisController) => controller.get({ id: params._[1] }), 
  
  // Realiza una búsqueda de películas.
  search: (params, controller: PelisController) => controller.get({ search: params }),
  
  // Agrega una nueva película.
  add: (params, controller: PelisController) => {
    const { id, title, tags } = params;
    const newPelicula = { id, title, tags };
    return controller.add(newPelicula);
  },
  
  // Acción por defecto, obtiene todas las películas.
  undefined: (params, controller: PelisController) => controller.get({}),
};

// Función para analizar los parámetros de la línea de comandos.
function parseCommandLineArguments(argv) {
  return minimist(argv);
}

async function executeMain() {
  const controller = new PelisController();
  const parsedParams = parseCommandLineArguments(process.argv.slice(2));
  const action = parsedParams._[0]; // Acción proporcionada en la línea de comandos.

  try {
    // Ejecuta la función correspondiente a la acción.
    const result = await actionHandlers[action](parsedParams, controller);
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

executeMain();
