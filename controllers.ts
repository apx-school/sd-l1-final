import { PelisCollection, Peli } from "./models";

class PelisController {
  collection = new PelisCollection()
  constructor() { }
  async get(options):Promise<any> { 
    if (options.id) { 
      return await this.collection.getById(options.id)
    } else if (options.search.title || options.search.tag) {  
      return await this.collection.search(options.search)
    } else if (options.search) {  
      return await this.collection.getAll()
    }
  }
  add(Peli: Peli) { 
    return this.collection.add(Peli)
  }
}
export { PelisController };