import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  async get(options) {
    if (options.id) {
      var resultado = await this.peliculas.getById(options.id);
      if (resultado != undefined) {
        return resultado;
      }
    }
    if (options.search) {
      resultado = await this.peliculas.search(options.search);
      return resultado;
    } else {
      return await this.peliculas.getAll();
    }
  }

  async add(peli: Peli) {
    await this.peliculas.add(peli);
  }
}
export { PelisController };
