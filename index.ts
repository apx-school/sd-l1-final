import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const i = new PelisController();
  const result = minimist(argv);

  //Get ===> Seach: title && tag , title , tag
  if (result._[0] == "search") {
    if (result.title || result.tag) {
      let Peli = {
        search: {
          title: result.title,
          tag: result.tag,
        },
      };
      return i.get(Peli).then((r) => {
        return r;
      });
    }
  }

  //Add peli
  if (result._[0] == "add") {
    let addPeli = {
      id: result.id,
      title: result.title,
      tags: result.tags,
    };
    return i.add(addPeli).then((r) => {
      return r;
    });
  }

  //Get ===> ID
  if (result._[0] == "get") {
    let getPeli = {
      id: result._[1],
    };
    return i.get(getPeli).then((r) => {
      return r;
    });
  }

  //Get ===> null
  if (result._[0] == null) {
    return i.get(result).then((r) => {
      return r;
    });
  }
  return result;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  params.then(() => console.log(params));
}

main();
