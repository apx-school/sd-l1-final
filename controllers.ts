import { PelisCollection, Peli } from "./models";



class PelisController {
  peliculas:PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection()
  }
  get(options){
     if (options.action == "id"){
       return this.peliculas.getById(options.parametro2.id)
     }
     else if(options.action == "search" && options.parametro2.title){
       return this.peliculas.search(options.parametro2.title)
     }
     else if(options.action == "search" && options.parametro2.tags){
       return this.peliculas.search(options.parametro2.tags)
     }
  }
  add(peli:Peli){
    
  }
}
export { PelisController };

const prueba = new PelisController
console.log (prueba.get({title:"v"}))