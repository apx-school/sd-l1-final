import { PelisCollection, Peli } from "./models";

// Definición del tipo Options
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection; // Propiedad para almacenar la instancia de PelisCollection

  constructor() {
    this.model = new PelisCollection(); // Instancia de PelisCollection
  }

  async get(options?: Options): Promise<Peli[]> {
    try {
      if (options?.id) {
        const peli = await this.model.getById(options.id);
        return peli ? [peli] : []; // Devuelve un array con la película o vacío
      } else if (options?.search) {
        return this.model.search(options.search); // Busca por título o tag
      } else {
        return this.model.getAll(); // Devuelve todas las películas
      }
    } catch (error) {
      console.error("Error al obtener las películas:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  }

  getOne(options: Options): Promise<Peli> {
    return this.get(options).then((pelis) => pelis[0]); // Devuelve la primera película del resultado
  }

  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli); // Llama al método add del modelo
  }

  // Puedes agregar más métodos según sea necesario
}

export { PelisController };
