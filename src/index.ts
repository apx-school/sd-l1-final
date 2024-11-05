import minimist from "minimist";
import { PelisController, Options } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const instancia = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  const paramStg = params._[0];

  if (paramStg == "add") {
    const peli = new Peli();
    peli.id = await params.id;
    peli.tags = await params.tags;
    peli.title = await params.title;
    await instancia.add(peli);
  }
  if (paramStg == "get") {
    const id = parseInt(params._[1]);
    const idObj = { id: id };
    console.log(await instancia.get(idObj));
  }
  if (paramStg == "search") {
    const title = await params.title;
    const tag = await params.tag;
    const search = { title: title, tag: tag };
    const newOptions: Options = { search };
    console.log(await instancia.get(newOptions));
  }
  if (paramStg === undefined) {
    console.log(await instancia.get({}));
  }
}

main();
