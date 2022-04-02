import { PelisCollection, Peli } from "./models";

class PelisController {
  collection : PelisCollection
  constructor() {
    this.collection = new PelisCollection
  }

  async get(options:any){

    if (options.id){
      const getById = await this.collection.getById(options.id)
      return getById
     } else if(options.search){
       const getByTitle = await this.collection.search(options.search)
       return getByTitle
    } else {
      const getAll = await this.collection.getAll()
      return getAll
    }

}

  async add(peli:Peli){
    const agregarPeli = await this.collection.add(peli)
    return agregarPeli
  }

}
export { PelisController };