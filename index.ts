import { PelisCollection, Peli } from "./models"
import { PelisController }       from "./controllers" 
import * as minimist             from "minimist";

class ComandoSearchOptions {
  title: string
  tags: string
}

class ComandoGetOptions{
  action: "id" | "search"
  params: any
}

class ComandoOptions{
  action: "get" | "add"
  params: any
}

class Comando {
  action: ComandoOptions
  noFormat: boolean
}



function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}
function optionsParams(){
  
}

async function main() {
  const pelisController = new PelisController()
  
  // console.log(controller)
  const params = parseaParams(process.argv.slice(2));
  if (params._[0]=="add"){
    const peliNueva = new Peli
    peliNueva.id    = params.id
    peliNueva.title = params.title
    peliNueva.tags  = params.tags
    // pelisController.add(peliNueva)
    
    // console.log(peli)
  }
  if(params._[0]=="get" && params.id){
    const promesa = await pelisController.get({id: params.id})
    console.log(promesa)
  }
  if(params._[0]=="search" && params.title){
    const promesa = await pelisController.get({search:{title: params.title}})
    console.log(promesa)
  }
  if(params._[0]=="search" && params.tag){
    const promesa = await pelisController.get({search:{tags: params.tag}})
    console.log(promesa)
  }
  if(params._[0]=="search" && params.tag && params.title){
    const promesa = await pelisController.get({search:{title: params.title, tags: params.tag}})
    console.log(promesa)
  }
  if(params._[0]==null){
    const promesa = await pelisController.get({})
    console.log(promesa)
  }
  
  console.log(params);
  console.log(params._[0]);
}

main();
