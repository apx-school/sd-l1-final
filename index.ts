import { PelisCollection, Peli } from "./models"
import { PelisController }       from "./controllers" 
import * as minimist             from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function constructorPeli(nombrePeli,parametro){
  nombrePeli = new Peli
  nombrePeli.id = parametro.id
  nombrePeli.title = parametro.title
  nombrePeli.tags = parametro.tags
  return nombrePeli
}

async function main() {
  const pelisController = new PelisController()
  const params = parseaParams(process.argv.slice(2));

  if (params._[0]=="add"){
    const k1 = constructorPeli("peliNueva", params)
    pelisController.add(k1)
  }
  if(params._[0]=="get" && params.id){
    const promesa = await pelisController.get({id: params.id})
    console.log(promesa)
  }
  if(params._[0]=="search" && params.tag && params.title){
    const promesa = await pelisController.get({search:{title: params.title, tags: params.tag}})
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
  if(params._[0]==null){
    const promesa = await pelisController.get({})
    console.log(promesa)
  }
  
}

main();
