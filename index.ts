import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  // const ops = { search: resultado.search, tags: resultado.tags };
  return resultado;
}

((args) => {
  const params = parseaParams(args);
  console.log(params);
})(process.argv.slice(2));
