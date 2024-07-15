// import * as minimist from "minimist";
const argv = require("minimist")(process.argv.slice(2));

// function parseaParams(argv) {
//   const resultado = minimist(argv);

//   return resultado;
// }

function main() {
  // const params = parseaParams(process.argv.slice(2));

  console.log(argv);
}

main();
