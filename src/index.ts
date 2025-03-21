import minimist from "minimist";

import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log(resultado);

  // Si el comando es `add`, devolver el objeto con los datos necesarios
  if (resultado._[0] === "add") {
    return {
      command: "add",
      id: resultado.id,
      title: resultado.title,
      tags: Array.isArray(resultado.tags) ? resultado.tags : [resultado.tags], // Asegurar array
    };
  } else if (resultado._[0] === "get") {
    return { command: "get", id: parseInt(resultado._[1]) };
  } else if (resultado._[0] === "search") {
    return {
      command: "search",
      title: resultado.title,
      tag: resultado.tag,
    };
  }

  return resultado;
}

// Si el comando no es reconocido, devolver todo el resultado por defecto

function main() {
  const params = parseaParams(process.argv.slice(2));
  const peliController = new PelisController(); // Asegúrate de usar "peliController" en minúsculas
  if (params.command === "add") {
    peliController
      .add({
        id: params.id,
        title: params.title,
        tags: params.tags,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error al agregar pelicula:", error);
      });
  } else if (params.command === "get") {
    peliController.getOne({ id: params.id }).then((result) => {
      console.log(result);
    });
  } else if (params.command === "search") {
    peliController
      .get({ search: { title: params.title, tag: params.tag } })
      .then((result) => {
        console.log(result);
      });
  } else {
    peliController.get().then((result) => {
      console.log(result);
    });
  }
}
main();
