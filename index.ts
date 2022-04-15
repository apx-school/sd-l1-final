import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
    const resultadoMinimist = minimist(argv);

    // console.log(resultadoMinimist);
    // console.log(resultadoMinimist._);
    
    if (resultadoMinimist._ == "search") {
        delete resultadoMinimist._;
        return { search: resultadoMinimist }; 

    } else if (resultadoMinimist._ == "add") {
        delete resultadoMinimist._;
        return resultadoMinimist 
            
    } else if (resultadoMinimist._[0] == "get") {
        return {id: resultadoMinimist._[1]}; 

    } else {
        return {getAll: "getAll"}; 
    }
}

function main() {
    const params = parseaParams(process.argv.slice(2));

    console.log(params)
    // console.log(params.search)
    // console.log(params.id)
    // console.log(params.title)
    // console.log(params.tags)

    const pelisController = new PelisController();

    if(params.search || params.id){
        pelisController.get(params).then((resultado) => {
          console.log(resultado);
      });
    }
    else if (params.id && params.title && params.tags){
        pelisController.add(params).then();

    }
    else{
        pelisController.get(params).then((resultado) => {
          console.log(resultado);
    });
    }
}

main();