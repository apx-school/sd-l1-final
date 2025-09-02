import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  // Devuelve un array de pelis según las opciones de búsqueda
  async get(options?: Options): Promise<Peli[]> {
  console.log("Método get llamado con opciones:", options); // Agregar este log
  if (!options) {
    return this.model.getAll();
  }
  if (options.id) {
    const peli = await this.model.getById(options.id);
    return peli ? [peli] : [];
  }
  if (options.search) {
    return this.model.search(options.search);
  }
  return this.model.getAll();
}

  // Devuelve la primera peli encontrada según las opciones
  async getOne(options: Options): Promise<Peli | null> {
    const results = await this.get(options);
    return results.length > 0 ? results[0] : null;
  }

  // Agrega una nueva peli usando el modelo
  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController, Options };
