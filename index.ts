import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { PelisCollection } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const constroller = new PelisController();
  console.log(params);
  // if (params._[0] === "get") {
  //   let getId = params._[1];
  //   return constroller.get({ id: getId }).then((r) => console.log(r));
  // } else if (params._[0] === "search") {
  //   if (params.title) {
  //     return constroller.get(params).then((res) => console.log(res));
  //   }
  //   if (params.tag) {
  //     return constroller.get(params).then((r) => console.log(r));
  //   }
  // } else if (params._[0] === "add") {
  //   return constroller.add(params).then((re) => console.log(re));
  // } else {
  //   return constroller.get(params).then((ress) => console.log(ress));
  // }
}

main();

// let obj = {
//   id: 1,
//   title: "capitan",
//   tags: ["accion", "humor", "comedia"],
// };

// console.log();
