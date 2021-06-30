import { PelisController } from "./controllers"
import * as minimist from "minimist";

function parseaParams(argv: any) {
  const resultMin = minimist(argv);

  let object = {}

  if (resultMin._[0] == 'get') {
    object = { id: resultMin._[1] }
  } 
  if (resultMin._ == 'add') {
    if (resultMin.id && resultMin.title && resultMin.tags) {
      object = {
        add: {
          id: resultMin.id,
          title: resultMin.title,
          tags: resultMin.tags
        }
      }
    }
  }
  if (resultMin._ == 'search') {
    if (resultMin.title && resultMin.tag) {
      object = {
        search: {
          title: resultMin.title,
          tag: resultMin.tag
        }
      }
    } else if (resultMin.title) {
      object = {
        search: {
          title: resultMin.title
        }
      }
    } else if (resultMin.tag) {
      object = {
        search: {
          tag: resultMin.tag
        }
      }
    }
  }
  if (!resultMin._.length) {
    object = { getAll: "getAll" }
  }
  return object;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const movController = new PelisController();
  movController.get(params).then((result) => {
    console.table(result);
  }, (rejected) => {
    console.log("Rechazado: ", rejected)
  });
}

main();