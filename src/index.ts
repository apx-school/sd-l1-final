import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  /* console.log(params) */
  const pelisCont = new PelisController();


  if (params._[0] === "add"){
    const peli = {
      id: params.id,
      title: params.title,
      tags: params.tags
    };

    pelisCont.add(peli)

    return "La pelicula se agrego con exito";

  } else if (params._[0] === "get"){
    const busquedaId = {
      id: params._[1]
    };

    return pelisCont.getOne(busquedaId).then(
      (resp)=> console.log(resp)
    );

  } else if (params._[0] === "search"){
    const busquedaSearch = {
      search: {
        title: params.title,
        tag: params.tag
      }
    }

    if (busquedaSearch.search.tag === undefined){
      delete busquedaSearch.search.tag;
    } else if (busquedaSearch.search.title === undefined){
      delete busquedaSearch.search.title;
    };

    console.log(busquedaSearch)
    return pelisCont.get(busquedaSearch).then(
      (resp)=> console.log(resp)
    );
  }
}

main();