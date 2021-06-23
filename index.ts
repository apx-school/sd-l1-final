import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  //Como parametro podria ir otro nombre (ej: dataEntrada)
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  console.log(params);
}

main();
