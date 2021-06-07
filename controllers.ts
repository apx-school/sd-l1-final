import { PelisCollection, Peli } from "./models";



class PelisController {
  peliculas:PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection()
  }
  get(options){                                             // creamos las funciones get y add para la clase pelis controllers
     if (options.id){                                       // esta funcion  
       return this.peliculas.getById(options.id)
     }
      
    else  if(options.search){
       return this.peliculas.search(options.search)
     }
     else if(options.search){
       return this.peliculas.search(options.search)
     }
  
     
  }
  add(peli:Peli){
    return this.peliculas.add(peli)
  }
}
export { PelisController };

