import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptiones(args) {
  const pelis = new PelisController();
  if (args._[0] == "add") {
    return await pelis
      .add({
        id: args.id,
        title: args.title,
        tags: args.tags,
      })
      .then((res) => {
        return res;
      });
  }
  if (args._[0] == "get") {
    return pelis.get({ id: args._[1] });
  }
  if (args._[0] == "search") {
    return pelis.get({
      search: { title: args.title, tag: args.tag },
    });
  }
  if (_.isEmpty(args._[0])) {
    return pelis.get({ empty: "empty" });
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
