import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  const ops = { search: resultado.search, tag: resultado.tag };
  return {
    id: resultado.id,
    options: ops,
  };
}

(() => {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
})();
