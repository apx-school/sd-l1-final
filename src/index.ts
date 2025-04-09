import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  if (params._[0] === "add") {
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tags instanceof Array ? params.tags : [params.tags],
    };
    const result = await controller.add(peli);
    console.log(result);
  } else if (params._[0] === "get" && typeof params._[1] === "number") {
    const result = await controller.get({ id: params._[1] });
    console.log(result);
  } else if (params._[0] === "search") {
    const searchParams: any = {};
    if (params.title) searchParams.title = params.title;
    if (params.tag) searchParams.tag = params.tag;
    const result = await controller.get({ search: searchParams });
    console.log(result);
  } else {
    const result = await controller.get();
    console.log(result);
  }
}

main();
