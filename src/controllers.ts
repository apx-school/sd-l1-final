import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  coll: PelisCollection;
  constructor() {
    const nuevo = new PelisCollection();
    this.coll = nuevo;
  }

  async get(options?: Options): Promise<any> {
    if (options?.id !== undefined) {
      const peli = await this.coll.getById(options.id);
      if (peli) {
        return peli;
      } else {
        throw new Error(`Pelicula con id ${options.id} no encontrada`);
      }
    } else if (options?.search?.title || options?.search?.tag) {
      return await this.coll.search(options.search);
    } else {
      return await this.coll.getAll();
    }
  }
  

  async add(peli: Peli) {
    const added = await this.coll.add(peli);
    if (added) {
      console.log("Película añadida correctamente");
    } else {
      console.log("Error al añadir película: ID repetido");
    }
  }
}

export { PelisController };
