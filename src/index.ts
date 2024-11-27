import minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

async function main() {
  const args = minimist(process.argv.slice(2));
  console.log("argumentos", args);
  const pelisController = new PelisController();
  const comandoPrincipal = args._[0];
  if (comandoPrincipal === "add") {
    const newPeli: Peli = {
      id: args.id,
      title: args.title,
      tags: args.tag || [],
    };
    const resultado = await pelisController.add(newPeli);
    if (resultado) {
      console.log("Pelicula agregada correctamente");
    } else {
      ("Error:No se pudo agregar la pelicula, verifique el ID");
    }
  } else if (comandoPrincipal === "get") {
    const peli = await pelisController.get({ id: args.id });
    if (peli) {
      console.log(peli);
    } else {
      console.log("No se encontro ninguna pelicula con ese ID");
    }
  } else if (comandoPrincipal === "search") {
    const searchOptions = {
      title: args.title,
      tag: args.tag,
    };
    const results = await pelisController.get({ search: searchOptions });
    console.log(results);
  } else {
    console.log("Proporcione un comando valido");
  }
}
main();
