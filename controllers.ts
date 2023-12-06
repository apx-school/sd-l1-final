import { PelisCollection, Peli } from "./models";

type peli = {
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

  async get(peli?: peli){
    if(!peli){
      return await this.pelis.getAll()
    }
    if(peli.id){
      return await this.pelis.getById(peli.id).then(res => {return res})
    }
    if(peli.search){
      if(peli.search.tag && peli.search.title){
        const pelisFilter = await this.pelis.search(peli.search)
        return pelisFilter
      }
    }
    if(peli.search.tag){
      const pelisFilter = await this.pelis.search(peli.search)
      return pelisFilter
    }
    if(peli.search.title){
      const pelisFilter = await this.pelis.search(peli.search)
      return pelisFilter
    }
    
  }


async add(peli:Peli){
  return await this.pelis.add(peli)
}
}

export { PelisController };
