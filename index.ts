import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  let resultado = minimist(argv);
  return resultado
}

function processArgvs(argv) {
  const ControllerPeli = new PelisController();
  
  let resultado = argv;
  let argPrincipal = resultado._[0];
  let primerValor = resultado._[1];

  let tmp = ControllerPeli.pelisCollection.getAll()
  let aux
  
  if (_.isEmpty(argv)) {
    aux = ControllerPeli.pelisCollection.getAll().then((r) => {return r});
    tmp = aux
  }
  
  if (argPrincipal === "add") {
    let AddParams = {
      add: {
        id: resultado.id,
        title: resultado.title,
        tags: resultado.tags,
      },
    };

    aux = ControllerPeli.add(AddParams).then((r) => {return r})
    tmp = aux
  }

  if (argPrincipal == "get" && typeof primerValor == "number") {
    let result = { id: primerValor };
    
    aux = ControllerPeli.get(result).then((r) => {return r});
    tmp = aux
  }
  
  if (argPrincipal == "search") 
  {
    if (_.has(resultado, "tag") && _.has(resultado, "title")) {
      let TagAndTitleSearchResult = {
        search: {
          title: resultado.title,
          tags: resultado.tag,
        },
      };
      aux = ControllerPeli.get(TagAndTitleSearchResult).then((r) => {return r});
      tmp = aux} else
      
    if (_.has(resultado, "title")) {
      let titleSearchResult = {
        search: {
          title: resultado.title,
        },
      };
      aux = ControllerPeli.get(titleSearchResult).then((r) => {return r})
      tmp = aux;
    } else
  
    if (_.has(resultado, "tag")) {
      let TagSearchResult = {
        search: {
          tags: resultado.tag,
        },
      };
      aux = ControllerPeli.get(TagSearchResult).then((r) => {return r});
      tmp = aux
    }
  }
  return tmp
}

function main() {
  const commandsToEjecute = parseaParams(process.argv.slice(2));
  const finalResult = (processArgvs(commandsToEjecute))

  finalResult.then((resultadoFinal) => console.log(resultadoFinal))
}

main();
