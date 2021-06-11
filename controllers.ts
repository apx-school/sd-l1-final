import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection
  constructor() {
    this.collection = new PelisCollection
  };
  get(options){
    if(options.get){
      return this.collection.getById(options.get.id)
    }else if(options.search){
      return this.collection.search(options.search)
    }else {
      return this.collection.getAll()
    }
  }
  add(peli:Peli){
    return this.collection.add(peli)
  }
}
export { PelisController };
