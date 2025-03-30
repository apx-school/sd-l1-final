import minimist from "minimist";
import { Peli, PelisController } from "./controllers";

function parseaParams(argv: string[]): any {
  return minimist(argv);
}
async function main() {
  const resultado = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController();

  if (resultado._[0] === "add") {
    const peli: Peli = {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    };
    const respuesta = await pelisController.add(peli);
    console.log(respuesta ? "Pelicula agregada" : "La pelicula ya existe");
  }
  else if (resultado._[0] === "get") {
    const respuesta = await pelisController.get({ id: Number(resultado._[1]) });
    console.log(respuesta);
  } else if (resultado._[0] === "search") {
    const searchOptions = { title: resultado.title, tag: resultado.tag };
    const respuesta = await pelisController.get({ id: resultado.id, search: searchOptions });
    console.log(respuesta);
  } else {
    const respuesta = await pelisController.get();
    console.log(respuesta);
  }
}
main()