import * as minimist from "minimist";
import { PelisController } from "./controllers";

// Funcion para parsear los parametros pasados por la terminal
// function parseaParams(argv) {
//   const result = minimist(argv);
//   //si al accion es get
//   if (result._[0] == "get") {
//     return { id: result._[1] };
//   } else if (result._[0] == "search") {
//     if (result.tags && result.title) {
//       return { search: { title: result.title, tags: result.tags } };
//     } else if (result.tags) {
//       return { search: { tags: result.tags } };
//     } else if (result.title) {
//       return { search: { title: result.title } };
//     }
//   } else if (result._[0] == "add") {
//     return { id: result.id, title: result.title, tags: result.tags };
//   } else {
//     return {};
//   }
// }
// // Funcion para poder procesar los parametros
// function pasaParametros(params) {
//   //instancio un objeto PelisController
//   const controller = new PelisController();
//   if (params.id && params.title && params.tags) {
//     return controller.add(params).then((p) => {
//       console.log(p);
//     });
//   } else if (params.id) {
//     return controller.get(params).then((p) => {
//       console.log(p);
//     });
//   } else if (params.search) {
//     return controller.get(params).then((p) => {
//       console.log(p);
//     });
//   } else {
//     return controller.get(params).then((p) => {
//       console.log(p);
//     });
//   }
// }

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

// Función para poder procesar los parámetros
function procesarOpciones(params): Promise<any> {
  // Instancio un objeto PelisController
  const controlador = new PelisController();

  // Si no se pasa ningún parámetro...
  if (params._.length == 0) {
    return controlador.get({});
  }

  // Si la acción es get...
  if (params._[0] == "get") {
    // Obtengo el ID para la búsqueda
    const id = params._[1];

    // Hago la búsqueda
    return controlador.get({ id: id });
  }

  // Si la acción es search...
  else if (params._[0] == "search") {
    // Primero, obtengo si hay los parámetros title y tag
    const titulo = params.title;
    const tag = params.tag;

    // Hago la búsqueda
    return controlador.get({ search: { tag: tag, title: titulo } });
  }

  // Si la acción es add...
  else if (params._[0] == "add") {
    // Primero, obtengo los parámetros
    const id = params.id;
    const titulo = params.title;
    let tags = params.tags;

    // Si hay un sólo tag, lo agrego a un array
    if (typeof tags == "string") {
      tags = [tags];
    }

    // Agrego la película al archivo
    return controlador.add({ id: id, title: titulo, tags: tags });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const accion = procesarOpciones(params);
  // Muestro los resultados segun lo que pida el usuario
  accion.then((res) => console.log(res));
}

main();
