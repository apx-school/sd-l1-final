import * as mini from "minimist";
import { PelisController } from "./controllers";
import * as _ from "lodash";

function parseaParams(argv) {
  return mini(argv);
}

function processOptions(params) {
  const controller = new PelisController();

  if (params._[0] == "add") {
    return controller.add({
      title: params.title,
      tags: params.tag,
      id: params.id,
    });
  }

  if (params._[0] == "get") {
    return controller.get({ id: params._[1] });
  }

  if (params._[0] == "search") {
    return controller.get({
      search: { title: params.title, tag: params.tag },
    });
  }

  if (_.isEmpty(params._[0])) {
    return controller.get({ empty: "empty" });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  return processOptions(params).then((res) => console.log(res));
}

main();
