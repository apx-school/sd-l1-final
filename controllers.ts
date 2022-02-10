import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }

  async add(peli: Peli): Promise<boolean> {
    const resultado = await this.peliculas.add(peli);
    return resultado;
  }

  async get(options: any): Promise<any> {
    if (options.id) {
      return await this.peliculas.getById(options.id);
    }
    if (options.search) {
      return await this.peliculas.search(options.search);
    } else {
      return await this.peliculas.getAll();
    }
  }
}

export { PelisController };
