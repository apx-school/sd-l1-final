import { PelisCollection, Peli } from "./models";


class PelisController {
  peliculas:PelisCollection
  promesa: Promise <any>
  constructor() {
    let pelis = new PelisCollection
    this.peliculas = pelis
    const laPreomesa = this.peliculas.getAll();
    this.promesa = laPreomesa;
  }
  procesaOpciones (opciones){

    let resultado;
    if (opciones._.includes("add")){
      resultado = this.add(opciones)
     } else if (opciones._.includes("search") || opciones._.includes("get")){
     resultado = this.get(opciones)
     } else {resultado = this.peliculas}
     return resultado;
  };

  get(options){
    
  let respuesta;

    if (options.hasOwnProperty("id")){
      respuesta = this.peliculas.getById(options.id)
    }  
   else if (options.hasOwnProperty("title")){
    respuesta = this.peliculas.search(options.title)
    }
   else if (options.hasOwnProperty("tags")){
      respuesta = this.peliculas.search(options.tags)
    } else if (options.search.hasOwnProperty("title")){
      respuesta = this.peliculas.search(options.search)
    } else if (options.search.hasOwnProperty("tags")){
      respuesta = this.peliculas.search(options.search)
    }
  

    return respuesta;
   

  };

  
 add(object){

let pelicula = new Peli
 pelicula.id = object.id
 pelicula.tags = object.tags
 pelicula.title = object.title

return this.peliculas.add(pelicula)
   
  };

};

export { PelisController };



  
