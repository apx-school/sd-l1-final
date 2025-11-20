 import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  title?: string; // Cambiamos filter por title
  tag?: string;   // Agregamos tag directamente
};

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    }

    const allPelis = await this.model.getAll();

    // Filtrar manualmente si hay opciones de búsqueda
    return allPelis.filter(peli => {
      const matchesTitle = options?.title ? peli.title.includes(options.title) : true;
      const matchesTag = options?.tag ? peli.tags.includes(options.tag) : true;
      return matchesTitle && matchesTag;
    });
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }
}

export { PelisController };
