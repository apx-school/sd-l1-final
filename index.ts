import * as minimist from "minimist";
//import { PelisController } from "./controllers";

/* function parseaParams(argv) {
  const params = minimist(argv);
  const option = params._[0];
  if (option == "get") {
    return { id: params._[1] };
  } else if (option == "search") {
    if (params.titel && params.tags) {
      return { search: { titel: params.titel, tags: params.tags } };
    } else if (params.titel) {
      return { search: { titel: params.titel } };
    } else if (params.tags) {
      return { search: { tags: params.tags } };
    }
  } else if (option == "add") {
    return { add: { id: params.id, titel: params.titel, tags: params.tags } };
  } else {
    return { all: 1 };
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controllers = new PelisController();
  controllers.get(params).then((resultado) => {
    console.log(resultado);
  });
}

main();
 */
