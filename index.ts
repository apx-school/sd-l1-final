import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  //Si aca detecta get como primer parametro del argv, retorna un objeto {id: number}
  if (resultado._[0] == "get") {
    return {
      id: resultado._[1],
    };
    //Si aca detecta search como primer parámetro del argv, retorna un objeto {search: {title || tag : string}}
  } else if (resultado._[0] == "search") {
    //Aca entramos en un triple If       **()**

    //Si posee title y tag retorna {search: {title: string, tag: string}}            **1**
    if (resultado.title && resultado.tag) {
      return { search: { title: resultado.title, tag: resultado.tag } };
    }
    //Si solo posee title retorna {search: {title: string}}                          **2**
    else if (resultado.title) {
      return { search: { title: resultado.title } };
    }
    //Por último si ninguno de los anteriores se ejecuto, se ejecuta esta línea dando retorno a {search: {tag: string}}
    //                                                                               **3**
    else if (resultado.tag) {
      return { search: { tag: resultado.tag } };
    }
  }
  //                                    **()**

  //Si el primer parámetro de la terminal fue "add" retorna {id: number, title: string, tags: string[]}
  else if (resultado._[0] == "add") {
    return { id: resultado.id, title: resultado.title, tags: resultado.tags };
  }
  //Si solo se ejecuto ts-node index.ts, sin indicar ningun parámetro, se devuelve {vacio: "vacio"}
  else if (resultado) {
    return { vacio: "vacio" };
  }
  return resultado;
}

//Function main, la que ejecuta todo.
async function main() {
  const params = parseaParams(process.argv.slice(2)); //parseo de los datos indicados en la terminal
  console.log("Parametros ingresados: ", params); //Imprime los datos en la terminal
  var resultado;
  //instancia del controlador
  const controlador = new PelisController();
  //Método add
  if (params.id && params.title && params.tags) {
    resultado = await controlador.add(params);

    //opcion "getById" y "search" del controlador =>
  } else if (params.id || params.search) {
    resultado = await controlador.get(params);
  }
  //Si no se indica ningún parámetro en la terminal => ("Se retornan todos los objetos de pelis.json")
  if (params.vacio == "vacio") {
    resultado = await controlador.getAll();
  }

  if (resultado !== undefined) console.log("RESULTADO: ", resultado);
}

main();
