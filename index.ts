import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  let obj = resultado;

  if ([resultado._].length > 0 && resultado._[0] == "get") {
    return (obj = {
      [resultado._[0]]: { id: resultado._[1] },
    });
  } else if (resultado._[0] == "get" || resultado._[0] == "search") {
    return (obj = {
      [resultado._[0]]: resultado,
    });
  } else if (resultado._[0] == "add") {
    return (obj = {
      [resultado._[0]]: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    });
  }
  return obj;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const control = new PelisController();

  if (params.get || params.search) {
    control.get(params).then((res) => console.log(res));
  } else if (params.add) {
    control.add(params.add).then((res) => console.log(res));
  }
}

main();
