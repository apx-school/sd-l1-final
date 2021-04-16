import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculasController : PelisCollection;

  constructor() {
    this.peliculasController = new PelisCollection();
  }
  get(options){
    if(options.id){
      return this.peliculasController.getById(options.id)
    }
    else if (options.search){
      return this.peliculasController.search(options.search)
    }
    else {
      return this.peliculasController.getAll();
    }
  }
  add(peli){
  return this.peliculasController.add(peli);
  }

}


export { PelisController};

