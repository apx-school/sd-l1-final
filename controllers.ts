import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis : PelisCollection
  constructor() {
    this.pelis = new PelisCollection()
  }
  get(options:any){
    
    if(!options){
      return this.pelis.getAll()
    }
    if(options.hasOwnProperty("id")){
      return this.pelis.getById(options.id)
    }
    if(options.hasOwnProperty("search")){
      return this.pelis.search(options.search)
    }
  }
  add(peli:Peli){
    return this.pelis.add(peli)
  }
}

export { PelisController };
