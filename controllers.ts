import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options){
    if(options.id){
      return await this.pelis.getById(options.id);
    }else if(options.search){
      if(options.title && options.tag){
        return await this.pelis.search(options.search);
      }else if(options.search.title){
        return await this.pelis.search(options.search);
      }else if(options.search.tag){
        return await this.pelis.search(options.search)
      }
    }else{
      return await this.pelis.getAll();
    }
  }

  async add(peli: Peli){
    return await this.pelis.add(peli);
  }
  
}
export { PelisController };
