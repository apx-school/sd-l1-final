import { PelisCollection, Peli, SearchOptions } from "./models";

type Options = {
  id?: number;
  search?: SearchOptions;
};

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  // Método principal: hace varias búsquedas según "options"
  async get(options?: Options): Promise<Peli[]> {
    if (options) {
      // 1. Si hay id
      if (options.id) {
        const peliPorId = await this.model.getById(options.id);
        // Devuelvo un array con la peli o vacío si no existe
        return peliPorId ? [peliPorId] : [];
      }

      // 2. Si hay search (title, tag, ambos)
      if (options.search) {
        return this.model.search(options.search);
      }
    }
    // Si no hay options o no matchea nada anterior, devuelvo todas
    return this.model.getAll();
  }

  // Devuelve el primer resultado de la búsqueda
  async getOne(options: Options): Promise<Peli> {
    const resultado = await this.get(options);
    return resultado[0];
  }

  // Método para agregar una nueva peli
  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController, Options };
