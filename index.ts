import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  var resultado = minimist(argv);
  return resultado;
}

async function processOptions(args) {
  const controller = new PelisController();
  if (args._[0] == "add") {
    return await controller
      .add({
        id: args.id,
        title: args.title,
        tags: args.tags,
      })
      .then((res) => {
        return res;
      });
  } else if (args._[0] == "get") {
    return await controller.get({ id: args._[1] });
  } else if (args._[0] == "search") {
    return await controller.get({
      search: { title: args.title, tag: args.tag },
    });
  } else if (_.empty) {
    return await controller.get({ empty: "empty" });
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
