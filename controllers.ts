import { PelisCollection, Peli } from "./models";

type options = {
  id?: number;
  search?:{
    title?: string;
    tag?: string;
  }
}

class PelisController {
  pelis: PelisCollection
  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options?:options){
    if(!options){
      return await this.pelis.getAll()
    }
    if(options.id){
      return await this.pelis.getById(options.id).then(res => {return res})
    }
    if(options.search){
      if(options.search.tag && options.search.title){
        const pelisFilter = await this.pelis.search(options.search)
        return pelisFilter
      }
    }
    if(options.search.tag){
      const pelisFilter = await this.pelis.search(options.search)
      return pelisFilter
    }
    if(options.search.title){
      const pelisFilter = await this.pelis.search(options.search)
      return pelisFilter
    }
    
  }


async add(peli:Peli){
  return await this.pelis.add(peli)
}
}

export { PelisController };
