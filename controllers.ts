import { PelisCollection, Peli } from "./models";

class PelisController {
  coleccionPeliculas = new PelisCollection()
  constructor() { }
  async get(options):Promise<any> { 
    if (options.id) { 
      return await this.coleccionPeliculas.getById(options.id)
    } else if (options.search.title || options.search.tag) {  
      return await this.coleccionPeliculas.search(options.search)
    } else if (options.search) {  
      return await this.coleccionPeliculas.getAll()
    }
  }
  add(Peli: Peli) { 
    return this.coleccionPeliculas.add(Peli)
  }
}
export { PelisController };


