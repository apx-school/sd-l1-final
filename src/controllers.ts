import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options: Options):Promise<Peli[]> {
    // Creo un array vacío para guardar los resultados de la petición
    const resultadoDeLaPeticion:Peli[] = [];
    // Si options.id existe, busco la película por id y la guardo en el array
    if (options.id) {
      const resultadoDeObtenerPorId = await this.model.getById(options.id);
      resultadoDeLaPeticion.push(resultadoDeObtenerPorId);
    // Si options.search existe, busco la película por search y la guardo en el array
    } else if (options.search) {
      const resultadoDeObtenerPorSearch = await this.model.search(options.search);
      resultadoDeLaPeticion.push(...resultadoDeObtenerPorSearch);
    // Si no existe options.id ni options.search, busco todas las películas y las guardo en el array
    } else {
      const resultadoDeObtenerTodas = await this.model.getAll();
      resultadoDeLaPeticion.push(...resultadoDeObtenerTodas);
    }
    // Devuelvo el array con los resultados de la petición
    return resultadoDeLaPeticion;
  }

  async getOne(options:Options):Promise<Peli> {
    // Obtengo el resultado de la petición
    const resultadoDeLaPeticion = await this.get(options);
    // Devuelvo el primer resultado de la petición
    return resultadoDeLaPeticion[0];
  }

  async add(peli:Peli):Promise<boolean> {
    // Agrego la película y guardo el resultado de la petición
    const resultadoDeAgregar = await this.model.add(peli);
    // Devuelvo el resultado de la petición
    return resultadoDeAgregar;
  }

}
export { PelisController };
