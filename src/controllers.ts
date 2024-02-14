import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    const pelis = new PelisCollection();
    this.pelis = pelis;
  }

  async get(options) {
    //si options no tiene ninguna propiedad devuelve todas las pelis del JSON
    if (options && !options.id && !options.search) {
      const todasLasPelis = await this.pelis.getAll();
      return todasLasPelis;
    }
    //si options tiene id filtra las pelis por su id
    else if (options.id) {
      const peliById = await this.pelis.getById(options.id);
      return peliById;
    }
    //si tiene search.title filtra las pelis que tengan ese string en su titulo
    else if (options.search.title) {
      const peliByTitle = await this.pelis.search({
        title: options.search.title,
      });
      return peliByTitle;
    }
    //si tiene search.tag filtra las pelis que tienen ese tag
    else if (options.search.tag) {
      const peliByTag = await this.pelis.search({ tag: options.search.tag });
      return peliByTag;
    }
  }

  async add(peli: Peli) {
    const peliNueva = await this.pelis.add(peli);
    return peliNueva;
  }
}

export { PelisController };
