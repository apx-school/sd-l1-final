import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection;
  }
  get(options): Promise<any>{
    if (options.id) {
      return this.collection.getById(options.id);
    } else if (options.search) {
      return this.collection.search(options.search);
    }
    return this.collection.getAll();
  }
  add(peli:Peli){
    return this.collection.add(peli);
  }
}
export { PelisController };