import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function commands(params) {
  const pelController = new PelisController();
  if (params._[0] == "get") {
    const found = params._[1];
    return pelController.get({ id: found }).then((resolve) => {
      return resolve
    });
  } else if ()

}


/*     return pelController.add(params).then((resolv) => console.log(resolv));
  } else if (params.search) {
    return pelController.get(params).then((resolv) => {
      console.log(resolv);
    });
  } else if (params.id) {
    return pelController.get(params).then((resolv) => {
      console.log(resolv);
    });
  } else if (params.year) {
    return pelController.get(params).then((resolv) => {
      console.log(resolv);
    });
  } else if (params == 0) {
    return pelController.get({}).then((resolv) => console.log(resolv));
  }
} */

function main() {
  const params = process.argv.slice(2);
  //console.log(params);
  const parsed = parseaParams(params);
  //console.log(parsed);
  const exe = commands(parsed);
  exe.then((resolve) => {
    console.log(resolve);
  });
}

main();
