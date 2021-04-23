import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const res = parseaParams(process.argv.slice(2));
  console.log(res);
  if (res._.includes("search") && res.title) {
    let obj = {
      action: "search",
      params: res.title,
    };
    console.log(obj);
    return obj;
  }
}

main();
