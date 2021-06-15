import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas:PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  get(options){//listo
    if(options.id){
      return this.peliculas.getById(options.id)
    }else if(options.search){
      if(options.search){//listo
        return this.peliculas.search(options.search);
      }
    }else{
      return this.peliculas.getAll();
    }
    return
  }
  add(peli:Peli){//listo
    return this.peliculas.add(peli)
  }
}
export { PelisController };