import * as minimist from "minimist";
import { PelisController } from "./controllers";

//Todo funciona Bien, pero lo tengo que organizar :l
function parseaParams(argv) {
  const i = new PelisController();
  const result = minimist(argv);

  //Add peli
  if (result._[0] == "add") {
    let peli = {
      id: result.id,
      title: result.title,
      tags: result.tags,
    };
    return i.add(peli).then((r) => {
      return r;
    });
  }

  //Get ===> ID
  if (result._[0] == "get") {
    let peli = {
      id: result._[1],
    };

    return i.get(peli).then((r) => {
      return r;
    });
  }
  //Get ===> Seach: title && tag , title , tag
  if (result._[0] == "search") {
    if (result.title && result.tag) {
      let peli = {
        search: {
          title: result.title,
          tags: result.tag,
        },
      };
      return i.get(peli).then((r) => {
        return r;
      });
    }
    if (result.title) {
      let peli = {
        search: {
          title: result.title,
        },
      };
      return i.get(peli).then((r) => {
        return r;
      });
    }
    if (result.tag) {
      let peli = {
        search: {
          tags: result.tag,
        },
      };
      return i.get(peli).then((r) => {
        return r;
      });
    }
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
