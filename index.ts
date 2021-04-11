import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const ControllerPeli = new PelisController();
  let resultado = minimist(argv);
  let argPrincipal = resultado._[0];
  let primerValor = resultado._[1];

  if (_.isEmpty(argv)) {
    ControllerPeli.pelisCollection.getAll().then((r) => {
      console.log(r);
    });
  }

  if (argPrincipal == "get" && typeof primerValor == "number") {
    let result = { id: primerValor };
    ControllerPeli.get(result).then((r) => {
      console.log(r);
    });
  }

  if (argPrincipal == "search") {
    if (_.has(resultado, "tag") && _.has(resultado, "title")) {
      let TagAndTitleSearchResult = {
        search: {
          title: resultado.title,
          tags: resultado.tag,
        },
      };
      ControllerPeli.get(TagAndTitleSearchResult).then((r) => {
        console.log(r);
      });
    } else if (_.has(resultado, "title")) {
      let titleSearchResult = {
        search: {
          title: resultado.title,
        },
      };
      ControllerPeli.get(titleSearchResult).then((r) => {
        console.log(r);
      });
    } else if (_.has(resultado, "tag")) {
      let TagSearchResult = {
        search: {
          tags: resultado.tag,
        },
      };
      ControllerPeli.get(TagSearchResult).then((r) => {
        console.log(r);
      });
    }
  }
}

function main() {
  parseaParams(process.argv.slice(2));
}

main();
