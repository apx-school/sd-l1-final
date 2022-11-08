import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
  const params = minimist(argv);
  const option = params._[0];

  if (option == "get") {
    return { id: params._[1] };
  } else if (option == "search") {
    if (params.title && params.tag) {
      return { search: { title: params.title, tag: params.tag } };
    } else if (params.title) {
      return { search: { title: params.title } };
    } else if (params.tag) {
      return { search: { tag: params.tag } };
    }
  } else if (option == "add") {
    return { add: { id: params.id, title: params.title, tags: params.tags } };
  } else {
    return {};
  }
}


async function main (){
  const params = parseaParams(process.argv.slice(2));
  const result = await new PelisController();
  console.log(await result.get(params))
}

main()