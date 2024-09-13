import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);

  const controller = new PelisController();
  if (params.add) {
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tags ? params.tags.split(",") : [] // Convertimos tags a array
    };

    await controller.add(peli);
    console.log("Pelicula agregada con éxito");
  } else {
    const search = await controller.get(params);
    console.table(search);
  }
}

main();
