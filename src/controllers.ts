import { PelisCollection, Peli } from './models'; // Asegúrate de importar correctamente el modelo

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection; // Propiedad interna para el modelo

  constructor() {
    this.model = new PelisCollection(); // Instancia del modelo
  }

  async get(options?: Options): Promise<Peli[]> {
    try {
      if (options?.id) {
        // Si se proporciona un id, busca la película por id
        const peli = await this.model.getById(options.id);
        return peli ? [peli] : []; // Devuelve un array con la película o vacío si no existe
      }

      if (options?.search) {
        // Si se proporciona un objeto de búsqueda
        return this.model.search(options.search); // Llama al método search del modelo
      }

      // Si no se proporciona ningún parámetro, devuelve todas las películas
      return this.model.getAll();
    } catch (error) {
      console.error("Error al obtener películas:", error);
      return []; // Devuelve un array vacío en caso de error
    }
  }

  async getOne(options: Options): Promise<Peli | null> {
    try {
      const pelis = await this.get(options); // Llama al método get
      return pelis[0] || null; // Devuelve el primer resultado o null si no hay resultados
    } catch (error) {
      console.error("Error al obtener una película:", error);
      return null; // Devuelve null en caso de error
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      // Aquí podrías agregar validaciones para los datos de la película
      return await this.model.add(peli); // Llama al método add del modelo
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false; // Devuelve false en caso de error
    }
  }
}

export { PelisController };
