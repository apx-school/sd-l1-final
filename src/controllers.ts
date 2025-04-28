import { PelisCollection, Peli } from "./models"; // Importa el modelo PelisCollection y la clase Peli

// Define el tipo Options para las búsquedas
type Options = {
  id?: number; // ID de la película
  search?: {
    title?: string; // Título de la película para buscar
    tag?: string; // Tag de la película para buscar
  };
};

// Clase PelisController que maneja la interacción con PelisCollection
class PelisController {
  model: PelisCollection; // Propiedad interna para almacenar la instancia de PelisCollection

  constructor() {
    this.model = new PelisCollection(); // Instancia el modelo PelisCollection
  }

  // Método para obtener películas según las opciones proporcionadas
  async get(options: Options = {}): Promise<Peli[]> {
    await this.model.load(); // Carga el modelo

    if (options.id) {
      const peliId = await this.model.getById(options.id); // Busca la película por ID
      return peliId ? [peliId] : []; // Devuelve la película o un array vacío
    }

    if (options.search) {
      return await this.model.search(options.search); // Busca películas según las opciones de búsqueda
    }

    return await this.model.getAll(); // Devuelve todas las películas si no hay opciones
  }

  // Método para obtener una sola película
  async getOne(options: Options = {}): Promise<Peli | undefined> {
    const result = await this.get(options); // Obtiene el resultado
    return result[0]; // Devuelve el primer elemento
  }

  // Método para agregar una nueva película
  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli); // Devuelve directamente la promesa de agregar la película
  }
}

export { PelisController, Options }; // Exporta la clase PelisController y el tipo Options
