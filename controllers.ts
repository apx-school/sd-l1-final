import { PelisCollection, Peli } from "./models";



class PelisController {
  peliculas:PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection()
  }
  get(options){
     if (options.id){
       return this.peliculas.getById(options.id)
     }
     else if(options.search){
       return this.peliculas.search(options.search)
     }
     else if(options.tags){
       return this.peliculas.search(options.tags)
     }
  }
  add(peli:Peli){
    return this.peliculas.add(peli)
  }
}
export { PelisController };

const prueba = new PelisController
console.log (prueba.get({title:"v"}))