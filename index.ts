import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv){
  const params = minimist(argv);
  const options = params._[0];

  if (options == "get") {
    return {id : params._[1]};

  } else if (options == "search"){

    if (params.title && params.tag){
    return {search : {title: params.tittle, tags: params.tag}};

  }else if (params.title) {
      return {search : {title: params.title}};

    }else if (params.tag) {
      return {search : {tags: params.tag}};

    }
  
  }else if (options == "add") {
    return {add : {id: params.id , title : params.title, tags : params.tags}};
  }else {
return {all : 1}
  }
}
 


function main() {
  const params = parseaParams(process.argv.slice(2));
const peliculas = new PelisController();
  peliculas.get(params).then((result) => {
    console.log(result);
  
  });

  }

main();
