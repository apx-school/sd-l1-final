import * as minimist from "minimist";
import { PelisController } from "./controllers";
import * as _ from "lodash";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptions(argv) {
  const controller = new PelisController();
  if (argv._[0] == "add") {
    return await controller
      .add({
        id: argv.id,
        title: argv.title,
        tags: argv.tags,
      })
      .then((res) => {
        return res;
      });
  }
  if (argv._[0] == "get") {
    return controller.get({ id: argv._[1] });
  }
  if (argv._[0] == "search") {
    return controller.get({
      search: { title: argv.title, tags: argv.tags },
    });
  }
  if (_.isEmpty(argv._[0])) {
    return controller.get({ empty: "empty" });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  return processOptions(params).then((res) => {
    console.log(res);
    return res;
  });
}

main();
