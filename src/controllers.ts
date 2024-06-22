import { PelisCollection, Peli, SearchOptions } from "./models";

type Options = {
  id?: number;
  search?:{
    title?: string;
    tag?: string;
  };
};

class PelisController {
  collection: PelisCollection
  constructor() {
    this.collection = new PelisCollection();
  }

  get(options?:Options) {
    if(options?.id){
       return this.collection.getById(options.id)
      }
    if (options?.search){
      const searchOptions: SearchOptions = {};
      if(options.search.title) {
        searchOptions.title = options.search.title;
        }
      if(options?.search.tag){
        searchOptions.tag = options.search.tag;
        }
      return this.collection.search(searchOptions); 
    }
    
    return this.collection.getAll();
  }

  add(peli:Peli){
    this.add(peli);
  }
}

export { PelisController };

