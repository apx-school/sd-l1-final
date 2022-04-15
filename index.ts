import { PelisController } from "./controllers"
import * as minimist from "minimist";


function parseaParams(argv) {
  const parsed = minimist(argv);
  const resultado = {method: "get", options:{}};
 
  if(parsed._.includes("add")){
   resultado.method = "add";
   resultado.options = {id: parsed.id, title:parsed.title, tags:parsed.tags}
   
  }else if(parsed._.includes("search")){
    resultado.method = "get"
    resultado.options = {search:{title: parsed.title, tag:parsed.tag}};

  }else if(parsed._.includes("get")){
    resultado.method = "get";
    resultado.options = {id: parsed._[1]};
  }
  console.log(resultado.options)
return resultado
}

function main() {
  const controller = new PelisController();
  const params = parseaParams(process.argv.slice(2));

  controller[params.method](params.options).then((res) => {console.log(res)});
}

main();
