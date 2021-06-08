import { PelisCollection, Peli } from "./models";


class PelisController {
  data: Peli[] = [];
  collectionPelis: PelisCollection;
  constructor() {
    this.collectionPelis = new PelisCollection();
    this.collectionPelis.getAll();
  }
  get(options:any) {
    if (options.id){
      return this.collectionPelis.getById(options.id);
    }
    if (options.search.title && options.search.tags){
      return this.collectionPelis.search(
        options.search.title && options.search.tags);
    }
    else if (options.search){
      return this.collectionPelis.search(options.search);

    } else if(options.search){
      return this.collectionPelis.search(options.search);
    }
  }
  add(peli:Peli){
   this.data.push(peli);
  }
}
export { PelisController };
