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
    let pelis = await this.model.getAll();

    if (!options) {
      return pelis;
    }

    if (options.id) {
      pelis = pelis.filter((peli) => peli.id === options.id);
    }

    if (options.search) {
      pelis = pelis.filter((peli) => {
        const matchesTitle = options.search.title
          ? peli.title.toLowerCase().includes(options.search.title.toLowerCase())
          : true;

        const matchesTag = options.search.tag
          ? peli.tags?.map((tag) => tag.toLowerCase()).includes(options.search.tag.toLowerCase())
          : true;

        return matchesTitle && matchesTag;
      });
    }

    return pelis;
  }

  async getOne(options: Options): Promise<Peli | null> {
    const pelis = await this.get(options);
    return pelis.length > 0 ? pelis[0] : null;
  }

  async add(peli: Peli): Promise<boolean> {
    await this.model.add(peli);
    return true;
  }
  
}

export { PelisController };


