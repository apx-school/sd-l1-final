import * as minimist from "minimist";
import { PelisController } from "./controllers";

function comandosEjecutados(params) {
  const controls = new PelisController();
  if (params.title && params.id && params.tags) {
    return controls.add(params).then((r) => console.log(r));
  } else if (params.search || params.id) {
    return controls.get(params).then((r) => console.log(r));
  } else {
    return controls.get({}).then((r) => console.log(r));
  }
}

function parseaParams(argv) {
  const minimistResultado = minimist(argv);
  if (minimistResultado._[0] == "get") {
    return { id: minimistResultado._[1] };
  } else if (minimistResultado._[0] == "search" && minimistResultado.title) {
    return { search: { title: minimistResultado.title } };
  } else if (minimistResultado._[0] == "search" && minimistResultado.tag) {
    return { search: { tag: minimistResultado.tag } };
  } else if (
    minimistResultado._[0] == "search" &&
    minimistResultado.tag &&
    minimistResultado.title
  )
    return {
      search: { tag: minimistResultado.tag, title: minimistResultado.title },
    };
  else if (minimistResultado._[0] == "add") {
    return {
      title: minimistResultado.title,
      id: minimistResultado.id,
      tags: minimistResultado.tags,
    };
  } else {
    return {};
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  comandosEjecutados(params);
}

main();
