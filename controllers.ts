import { PelisCollection, Peli } from "./models";


class PelisController {
  peliculas: PelisCollection
  promesa: Promise <any>

  constructor() {
    this.peliculas = new PelisCollection();
    this.promesa = this.peliculas.getAll();
    

  };

  get(options:any):Promise <any>{
    
    if (options.id) {
      return this.peliculas.getById(options.id)
    } 
    if(options.search) {
      return this.peliculas.search(options.search)}
    else
     {
      return this.peliculas.getAll()
    }
  }

  add(peli:Peli){
    return this.peliculas.add(peli)
  }
};



export { PelisController };