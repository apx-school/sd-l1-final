import * as minimist from "minimist";
import { formatWithOptions } from "util";
import { PelisController } from "./controllers"

function parseaParams(argv) {
  const params = minimist(argv);
  const option = params._[0];

  if (option == "get") {
    return { id: params._[1] };
  } else if (option == "search") {
    if (params.title && params.tag) {
      return { search: { title: params.title, tags: params.tag } };
    } else if (params.title) {
      return { search: { title: params.title } };
    } else if (params.tag) {
      return { search: { tags: params.tag } };
    }
  } else if (option == "add") {
    return { add: { id: params.id, title: params.title, tags: params.tag } };
  } else {
    return {};
  }
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = await new PelisController()
  console.log(await controller.get(params))
}

main();
