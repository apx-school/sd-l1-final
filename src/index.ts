import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const comando = params._[0];
  const instancia = new PelisController();
  if (comando === "add") {
    delete params._;
    instancia.add(params).then((res) => {
      if (res === true) {
        const resultado = console.log("Pelicula agregada correctamente");
      } else {
        return res;
      }
    });
  } else if (comando === "get") {
    if (!params._[1]) {
      return console.log("No mandaste id");
    } else {
      const recorte = params._.slice(1)[0];
      instancia.get({ id: recorte }).then((res) => {
        if (res.length === 0) {
          console.log("No existe una pelicula con ese Id");
        } else {
          return console.log(res);
        }
      });
    }
  } else if (comando === "search") {
    delete params._;
    instancia.get({ search: params }).then((res) => {
      if (res.length === 0) {
        console.log("No se encontro ninguna coincidencia");
      } else {
        return console.log(res);
      }
    });
  } else if (!comando) {
    return instancia.get().then((res) => {
      return console.log(res);
    });
  }

  //console.log(params);
}

main();
