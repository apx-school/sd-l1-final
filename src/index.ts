const minimist = require('minimist');

import { PelisController } from "./controllers";

async function main() {
  const params = minimist(process.argv.slice(2));
  const controller = new PelisController();

  if (params._[0] === "add") {
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };
    const resultado = await controller.add(peli);
    console.log(resultado ? "Peli agregada" : "No se pudo agregar la peli");
  } else if (params._[0] === "get") {
    const pelis = await controller.get({ id: params.id });
    console.log(pelis.length ? pelis[0] : "Peli no encontrada");
  } else if (params._[0] === "search") {
    const opciones = {
      title: params.title,
      tag: params.tag,
    };
    const resultados = await controller.get(opciones);

    console.log(resultados.length ? resultados : "No se encontraron películas");
  } else {
    console.log("Comando no reconocido. Usa add, get o search.");
  }
}

main();
