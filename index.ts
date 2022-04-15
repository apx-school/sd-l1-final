import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
    const resultado = minimist(argv);
    if (resultado._ == "search") {
        delete resultado._;
        return { search: resultado }; 
    } else if (resultado._ == "add") {
        delete resultado._;
        return resultado  
    } else if (resultado._[0] == "get") {
        return {id: resultado._[1]}; 
    } else {
        return {getAll: "getAll"}; 
    }
}

function main() {
    const params = parseaParams(process.argv.slice(2));
    var pelisCont = new PelisController();
    if(params.search || params.getAll){
        pelisCont.get(params);
    }else if (params.id && params.title && params.tags){
        pelisCont.add(params);
    }else{
        pelisCont.get(params);
    }
}

main();
