import * as minimist from "minimist";
import {PelisController} from "./controllers"

const parseaParams = (argv) =>{
  const resultado = minimist(argv);
  let action = resultado._[0]
  return {
    action: action,
    id:resultado.id,
    title : resultado.title,
    tags : resultado.tags,
    tag:resultado.tag

  }
  } 
 async function main() {
  const params = await parseaParams(process.argv.slice(2));
  let controlador = new PelisController()
  let resul;
  if(params.action === undefined && params.id === undefined && params.tags === undefined && params.title === undefined){
    resul = await controlador.get({})
    console.log(resul)
  }
  if(params.action === "add"){
    resul = await controlador.add({id:params.id,title:params.title,tags:params.tags})
    console.log(resul)
  }
if(params.action === "get"){
  resul = await controlador.get({id:parseInt(process.argv.slice(2)[1])})
  console.log(resul)
}
if(params.action === "search"){
  if(params.tag !== undefined && params.title !== undefined){
    console.log({title:params.title,tag:params.tag})
    let options = {search:{
      title:params.title,
      tag:params.tag
    }}
    resul = await controlador.get(options)
    console.log(resul)
  }
  if(params.tag === undefined && params.title){
    let options = {
      search:{
      title: params.title

      }
    }
    resul = await controlador.get(options)
    console.log(resul)
  }
  if(params.tag && params.title === undefined){
    let options = {
      search:{
      tag: params.tag
    }
    }
    resul = await controlador.get(options)
    console.log(resul)
  }
}
}

main();
