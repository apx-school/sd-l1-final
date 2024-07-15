import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }

  async get(options?: Options): Promise<any> {
    if (!options) {
      return await this.peliculas.getAll();
    }

    if (options.id) {
      return await this.peliculas.getById(options.id);
    }

    if (options.search) {
      const { title, tag } = options.search;

      let peliculas = await this.peliculas.search(options.search);

      if (title) {
        peliculas = peliculas.filter(
          (peli) => peli.title && peli.title.includes(title)
        );
      }

      if (tag) {
        peliculas = peliculas.filter(
          (peli) => peli.tags && peli.tags.includes(tag)
        );
      }

      return peliculas;
    }

    return await this.peliculas.getAll();
  }

  add(peli: Peli) {
    return this.peliculas.add(peli);
  }
}

export { PelisController };
