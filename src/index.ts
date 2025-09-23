import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: any) {
  return minimist(argv);
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  const comando = params._[0];

  if (comando === "add") {
    const id = Number(params.id);
    const title = params.title;
    const tags = Array.isArray(params.tag) ? params.tag : [params.tag];
    const resultado = await controller.add({ id, title, tags });
    console.log(resultado ? "Peli agregada" : "No se pudo agregar la peli");
  } else if (comando === "get") {
    const id = Number(params._[1]);
    const peli = await controller.getOne({ id });
    console.log(peli);
  } else if (comando === "search") {
    const searchOptions: any = {};
    if (params.title) searchOptions.title = params.title;
    if (params.tag) searchOptions.tag = params.tag; // mapear singular a plural
    const resultados = await controller.get({ search: searchOptions });
    console.log(resultados);
  } else {
    const todas = await controller.get();
    console.log(todas);
  }
}

main();
