import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
    const resultado = minimist(argv);
    console.log("parametros", resultado)
    return resultado;
}

async function ejecutaAccion(options){
  const coll = new PelisController() 

  //sin argumentos devuelve getAll
  if (options._.length == 0){                   
    return coll.get({})
  } else if( options._[0].toLowerCase() == 'get'){
    //getByID                  
    const id = options._[1];
    const pelicula = await coll.get({id: id})

    //Si no encuentra la pelicula devuelve un error
      if(!pelicula){                            
      throw new Error("Pelicula no encontrada")
      }
    return pelicula
  }else if(options._[0].toLowerCase() == 'search'){

    //Busqueda por tag y por titulo
    if(options.tag && options.title){
    }else if(options.tag){
      return coll.get({search:{tag:options.tag}})
    }else if(options.title){
      return coll.get({search:{title: options.title}})
    }
    return false
  }else if(options._[0].toLowerCase() == 'add'){
    //Agregar una pelicula al JSON
    console.log("entro al add")
    const peliNueva ={id:options.id,title:options.title,rating: options.rating,tags:options.tag,year:options.year}
    return coll.add(peliNueva)
  }
  return false
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  ejecutaAccion(params).then((res)=>{console.log(res)})
}

main();
