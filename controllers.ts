import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>
  constructor() {
    this.pelis = new PelisCollection();
    const promesa = this.pelis.getAll();
    this.promesa = promesa;
  }
  async get(options:any):Promise<any>{
    // si el objeto tiene la propiedad id (ej: { id:1234 }), debe devolver la película con ese id.
    if (options.id) {
      return await this.pelis.getById(options.id);
    }
    // Este da undefined. Seguir desde acá
    if (options.search) {
      if (options.search.title) {
        return await this.pelis.search(options.search);
      }
      if (options.search.tag) {
        return await this.pelis.search(options.search);
      }
      if (options.search.title && options.search.tag) {
        return await this.pelis.search(options.search.title && options.search.tag);
      }
    }
    if (options.empty) {
      return await this.pelis.getAll();
    }
  }
  async add(peli:Peli){
    return await this.pelis.add(peli);
  }
}
export { PelisController };
