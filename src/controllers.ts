import { PelisCollection, Peli } from "./models";


type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  coleccionPelis:PelisCollection

  constructor(coleccionPelis:PelisCollection) {
    this.coleccionPelis = coleccionPelis;
  }

  get(options?:Options){
    if (options?.id){
      return this.coleccionPelis.getById(options.id)
    }
    else if (options?.search?.title){
      return this.coleccionPelis.search({title : options.search.title});
    }
    else if (options?.search?.tag){
      return this.coleccionPelis.search({tag : options.search.tag});
    }
    else if (options?.search?.tag && options?.search?.title){
      return this.coleccionPelis.search({
        tag : options.search.tag , 
        title : options.search.title});
    }
    else {
      return this.coleccionPelis.getAll();
    }
  }

  add(peli:Peli){
    return this.coleccionPelis.add(peli);
  }


}
export { PelisController };
