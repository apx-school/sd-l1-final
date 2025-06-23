import minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  

  if (resultado["_"] == "add"){
    if(!resultado.id || !resultado.title || !resultado.tags){
      return "Missing Peli data"
    }

    var peli = {}
    peli["id"] = resultado.id
    peli["title"] = resultado.title
    peli["tags"] = resultado.tags

    return {"add": peli}
  }

  if(resultado["_"] == "search"){

    var options = {}
    options["search"] = {}
    if(resultado["title"]){
      options["search"]["title"] = resultado["title"]
    }

    if(resultado["tag"]){
      options["search"]["tag"] = resultado["tag"]
    }

    return {"get": options}
  }

  if(resultado["_"].includes("get")){
    if(resultado["_"][1]){
      return {"get": {"id": resultado["_"][1]}}
    }
  } else {
    return {"get": {}}
  }

}

async function main() {
  const params = parseaParams(process.argv.slice(2));

  const pelisController = new PelisController()

  if(params["add"]){
    var result = await pelisController.add(params["add"])
    console.log(result)
  } else if (params["get"]){
    var resultGet = await pelisController.get(params["get"])
    console.log(resultGet)
  }

}

main();
