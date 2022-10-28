import { PelisCollection, Peli } from "./models";

class PelisControllerOptions {
  id?: number
  search?: {
    title?: string;
    tag?: string
  }
  null? : null;
}

class PelisController {
  listaDePelis: any;
  constructor() {
    const nuevaPeliColl = new PelisCollection();
    this.listaDePelis = nuevaPeliColl;
  }
  async get(options: PelisControllerOptions){
    if (options.hasOwnProperty("null")){
      return await this.listaDePelis.getAll();
    } if (options.hasOwnProperty("id")){
      return await this.listaDePelis.getById(options.id)
    }  else if (options.hasOwnProperty("search") && options.search.hasOwnProperty("title") && options.search.hasOwnProperty("tag")){
      return await this.listaDePelis.search(options.search);
    } else if (options.hasOwnProperty("search") && options.search.hasOwnProperty("title")) {
      return await this.listaDePelis.search(options.search);
    } else if (options.hasOwnProperty("search") && options.search.hasOwnProperty("tag")) {
      return await this.listaDePelis.search(options.search);
    };
  };
  async add(peli: Peli){
    return await this,this.listaDePelis.add(peli);
  };
}

export { PelisController };