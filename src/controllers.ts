import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  async get(options?: Options) : Promise <any> {
    if (options?.id !== undefined) {
      const resultado = await this.pelis.getById(options.id);
      if (resultado) {
        return resultado;
      } else {
        throw new Error(`Pelicula con id ${options.id} no encontrada`);
      }
    } else if (options?.search?.title || options?.search?.tag) {
      return await this.pelis.search(options.search);
    } else if (!options){
      return await this.pelis.getAll();
    }
  }

  async add(peli:Peli) {
    this.pelis.add(peli);
  }
}


export { PelisController };