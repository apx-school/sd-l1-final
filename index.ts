import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function actions(argv) {
  const controller = new PelisController();

  if (argv._[0] == "get") {
    const id = argv._[1];
    return controller.get({ id: id }).then((res) => {
      return res;
    });
  }
  if (argv._[0] == "search") {
    let resSearch = {};
    if (argv.title && argv.tag) {
      resSearch: {
        title: argv.title;
        tags: argv.tag;
      }
    }
    if (argv.title) {
      resSearch: {
        title: argv.title;
      }
    } else if (argv.tag) {
      resSearch: {
        tags: argv.tag;
      }
    }
    return controller.get({ search: resSearch }).then((res) => {
      return res;
    });
  }
  if (argv._[0] == "add") {
    let newPeli = {
      add: {
        id: argv.id,
        title: argv.title,
        tags: argv.tag,
      },
    };
    return controller.add(newPeli).then((res) => {
      return res;
    });
  }
  if (argv._.length == 0) {
    return controller.get([]).then((res) => {
      return res;
    });
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const resultado = actions(params);
  resultado.then((r) => {
    console.log(r);
  });
}

main();
