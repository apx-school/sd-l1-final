import { PelisCollection, Peli } from "./models";

class PelisController {
  data: Peli[] = [];
  collectionPelis: PelisCollection;
  constructor() {
    this.collectionPelis = new PelisCollection();
    this.collectionPelis.getAll();
  }
  get(options){
    if (options.id){
      return this.collectionPelis.getById(options.id);
    }
    if (options.search.title){
      return this.collectionPelis.search(options.search.title);
    }
    if (options.search.tags){
      return this.collectionPelis.search(options.search.tags);
    } else{
      return this.collectionPelis.getAll();
    }
  }
  add(peli:Peli){
  return this.data.push(peli);
  }
}
export { PelisController };
