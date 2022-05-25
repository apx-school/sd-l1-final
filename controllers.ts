import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas:PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
    
  }
  get(options?){
    if(!options){
      return this.peliculas.getAll();

    }else if(options.id){
      
      return this.peliculas.getById(options.id);

    }else if (options.search){
     
     return this.peliculas.search(options.search);
      
    }
    
  }

  add(peli:Peli){
    return this.peliculas.add(peli);
  }
}


export { PelisController };
