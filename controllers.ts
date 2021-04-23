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

  get(options){
    
  let respuesta;

    if (options.hasOwnProperty("id")){
      respuesta = this.peliculas.getById(options.id)
    }  
   else if (options.hasOwnProperty("title")){
    respuesta = this.peliculas.search(options)
    }
   else if (options.hasOwnProperty("tags")){
      respuesta = this.peliculas.search(options)
    } 
    else if (options.search.hasOwnProperty("title")){
      respuesta = this.peliculas.search(options.search)
    }
     else if (options.search.hasOwnProperty("tags")){
      respuesta = this.peliculas.search(options.search)
    } else {respuesta = this.peliculas}
    return respuesta;
   
  };

  
add(object){
return this.promesa.then(()=> {
  let pelicula = new Peli
 pelicula.id = object.id
 pelicula.tags = object.tags
 pelicula.title = object.title

return this.peliculas.add(pelicula)
 })
 
 };

};

export { PelisController };

  

// let prueba = new PelisController

//  let peliP =  new Peli 
//  peliP = {title: "una peli", id : 55, tags : []}
//  prueba.add(peliP).then((r=>{console.log(r)}))
