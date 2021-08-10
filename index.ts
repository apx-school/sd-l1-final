import * as minimist from "minimist";
import { PelisController } from "./controllers";
import { Peli } from "./models";

function parseaParams(argv) {
  const rawImput = minimist(argv);
  let imput;
  if(rawImput._[0] == "get"){
    imput = {id: rawImput._[1]};
  }else if (rawImput._[0] == "add"){
    let nuevaPeli = new Peli ();
    nuevaPeli.id = rawImput.id;
    nuevaPeli.title = rawImput.title;
    nuevaPeli.tags = rawImput.tag;
    imput = {add: nuevaPeli};
  }else if (rawImput._[0] == "search" && rawImput.title && rawImput.tag){
    imput = {search: {title: rawImput.title , tag: rawImput.tag}}  
  }else if (rawImput._[0] == "search" && rawImput.title){
    imput = {search: {title: rawImput.title}}
  }else if (rawImput._[0] == "search" && rawImput.tag){
    imput = {search: {tag: rawImput.tag}}
  }else {
    imput = rawImput;
  }
return imput;}

function main() {
  let resultado;
  const pelisController = new PelisController();
  const imput = parseaParams(process.argv.slice(2));
  resultado = pelisController.processOptions(imput).then((listo)=>{console.log(listo)});
}

main();
