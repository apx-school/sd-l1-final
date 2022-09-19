import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor(){
    this.pelis = new PelisCollection();
    this.pelis.getAll();
  }
  async get(options?:any){
    if (!options) {
      return await this.pelis.getAll();
    }
    if (options.id) {
      return await this.pelis.getById(options.id);
    }
    if (options.search) {
			return await this.pelis.search(options.search);
		}
    /* if (options.search && options.search.title) {
      return await this.pelis.search(options.search);
    }
    if (options.search && options.search.tag) {
      return await this.pelis.search(options.search);
    }
    if (options.search.title && options.search.tag) {
      return await this.pelis.search(options.search);
    } */
  }
  async add(peli:Peli){
    return await this.pelis.add(peli);
  }
}

export { PelisController };
