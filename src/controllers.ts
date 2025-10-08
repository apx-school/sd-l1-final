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

  async get(options?: Options): Promise<Peli[]> {
    if (!options) {
      return this.model.getAll();
    }

    if (options.id !== undefined) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    if (options.search) {
      const { title, tag } = options.search;

      if (title && tag) {
        const peliculasPorTitulo = await this.model.search({ title });
        return peliculasPorTitulo.filter((peli) => peli.tags.includes(tag));
      } else if (title) {
        return this.model.search({ title });
      } else if (tag) {
        return this.model.search({ tag });
      }
    }

    return [];
  }

  async getOne(options: Options): Promise<Peli | undefined> {
    const resultados = await this.get(options);
    return resultados[0];
  }

  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController };
