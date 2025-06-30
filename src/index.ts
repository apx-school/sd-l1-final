import { PelisController } from "./controllers";
import minimist from "minimist";

async function main() {
  const argv = minimist(process.argv.slice(2));
  const controller = new PelisController();
  const action = argv._[0];

  if (action === "add") {
    // Para --tags puede venir como string o array
    const tags = Array.isArray(argv.tags) ? argv.tags : [argv.tags];
    const peli = {
      id: Number(argv.id),
      title: argv.title,
      tags: tags.filter(Boolean),
    };
    const respuesta = await controller.add(peli);
    console.log(respuesta);
  } else if (action === "get") {
    const id = Number(argv._[1]);
    const respuesta = await controller.get({ id });
    console.log(respuesta);
  } else if (action === "search") {
    const search: any = {};
    if (argv.title) search.title = argv.title;
    if (argv.tag) search.tag = argv.tag;
    const respuesta = await controller.get({ search });
    console.log(respuesta);
  } else {
    // Sin acción: mostrar todas las pelis
    const respuesta = await controller.get();
    console.log(respuesta);
  }
}

main();
