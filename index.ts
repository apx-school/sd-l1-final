import * as minimist from "minimist";
import  { PelisController } from "./controllers"
import { Peli } from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

// function main() {
//   const argumentosParseados = parseaParams(process.argv.slice(2));
//   const controller = new PelisController()
//   if (argumentosParseados._[0] == "search"){console.log("imprime")
//   if (argumentosParseados.title){return controller.get(
//     {search:{title:argumentosParseados.title}}).then((p)=>{console.log(p)}}}
  
  
//   // console.log(params)
  
  

function parametrosDeEjecucion (controller, parametros) {
  var resultado;
  if (parametros._[0] == "get"){return controller.get({ id:parametros._[1] }).then((r)=>{return r})}

  if (parametros._ == "search"){

       if (parametros.tags && parametros.title){return controller.get (
      {search:{title: parametros.title, tags: parametros.tags}}).then((p)=>{ return p})}
  
      else if (parametros.title){return controller.get({search:{title: parametros.title}}).then((p)=>{return p})}
      else if (parametros.tags){return controller.get({search: {tags: parametros.tags}}).then((p)=>{return p})}
   }

  else if (parametros._ == "add")
      { return controller.add({ id:parametros.id, title:parametros.title, tags:[parametros.tags] }).then((p)=>{return p}) }

  else if (parametros._.length == 0) {return controller.get({}).then((p) => {return p})}


 
 return resultado
}


function main (){
  const argumentosParseados = parseaParams (process.argv.slice(2));
  const controller = new PelisController()
  parametrosDeEjecucion (controller, argumentosParseados).then((p)=>{console.log(p)})

  
}

main ()