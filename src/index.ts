import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  //console.log(resultado);
  return {
    orden: resultado._,
    id: resultado["id"] || resultado._[1],
    title: resultado["title"],
    tag: resultado["tags"] || resultado["tag"],
  };
}

function instrucciones(parsedArgs) {
  if (parsedArgs.orden[0] == "add") {
    const cliPeli = new PelisController();
    delete parsedArgs.orden;
    cliPeli.add(parsedArgs);
  } else if (parsedArgs.orden[0] == "get") {
    const cliPeli = new PelisController();
    delete parsedArgs.orden;
    return cliPeli.get(parsedArgs);
  } else if (parsedArgs.orden == "search") {
    const cliPeli = new PelisController();
    delete parsedArgs.orden;
    delete parsedArgs.id;
    let search = parsedArgs;
    return cliPeli.get({ search });
  } else {
    const cliPeli = new PelisController();
    return cliPeli.get(undefined);
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  //console.log(params);
  //instrucciones(params);
  //console.log(instrucciones(params)); //ADD WORKS
  //console.log(instrucciones(params).then((e) => console.log(e))); //GET WORKS
  //console.log(instrucciones(params).then((e) => console.log(e))); //SEARCH WORKS
  //console.log(instrucciones(params).then((e) => console.log(e))); //GET ALL NO ARGS WORKS
}

main();
