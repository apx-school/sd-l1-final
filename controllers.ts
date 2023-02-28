import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }

  async get(options: any): Promise<any> {
    if (options.id) {
      return await this.peliculas.getById(options.id);
    } else if (options.search) {
      if (options.search.title && options.search.tag) {
        return await this.peliculas.search({
          title: options.search.title,
          tag: options.search.tag,
        });
      } else if (options.search.title) {
        return await this.peliculas.search({
          title: options.search.title,
        });
      } else if (options.search.tag) {
        return await this.peliculas.search({
          tag: options.search.tag,
        });
      }
    } else {
      return await this.peliculas.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.peliculas.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      await this.peliculas.add(peli);
      return true;
    }
  }
}

export { PelisController };
