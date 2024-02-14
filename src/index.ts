import minimist from "minimist";
import { PelisController } from "./controllers";

async function parseaParams(argv) {
  const controller = new PelisController();
  const resultado = minimist(argv);
  const action = resultado._[0];

  //si luego del index.ts hay un get filtr las pelis por el id que le paso por terminal
  if (action == "get") {
    return await controller.get({ id: resultado._[1] });
  }
  //si hay un add agregala al JSON
  else if (action == "add") {
    return await controller.add({
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    });
  }
  //si hay un search y tiene título, filtra las pelis por ese string
  else if (action == "search" && resultado.title) {
    return await controller.get({ search: { title: resultado.title } });
  }
  //si hay un search y un tags, filtra las pelis por ese tag
  else if (action == "search" && resultado.tag) {
    return await controller.get({ search: { tag: resultado.tag } });
  }
  //si no hay nada mostra todas las pelis del JSON
  else {
    return await controller.get({});
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2)).then((result) =>
    console.log(result)
  );
}

main();
