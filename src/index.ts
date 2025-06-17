import minimist from "minimist";
import { PelisController, Options } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  let tags: string[] = [];

  if (typeof params.tags === "string") {
    tags = params.tags.split(",");
  } else if (Array.isArray(params.tags)) {
    tags = params.tags;
  }

  const comando = params._[0];

  switch (comando) {
    case "add":
      const peli = {
        id: params.id,
        title: params.title,
        tags: tags,
      };
      const resultadoAdd = await controller.add(peli);
      console.log(resultadoAdd);
      break;
    case "get":
      const idParam = Number(params._[1]);
      const resultadoGet = isNaN(idParam)
        ? await controller.get()
        : await controller.get({ id: idParam });
      console.log(resultadoGet);
      break;
    case "search":
      const searchParams: any = {};
      if (params.title) searchParams.title = params.title;
      if (params.tag) searchParams.tag = params.tag;

      const resultadoSearch = await controller.get({ search: searchParams });
      console.log(resultadoSearch);
      break;
    default:
      const resultadoDefault = await controller.get();
      console.log(resultadoDefault);
      break;
  }
}

main();
