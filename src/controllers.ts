import { PelisCollection, Peli } from "./models";

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: {
    id?: number;
    search?: { title?: string; tag?: string };
  }): Promise<Peli[]> {
    if (options?.search) {
      const { title, tag } = options.search;
      let pelisFiltradas: Peli[] = await this.model.getAll();

      if (title) {
        pelisFiltradas = pelisFiltradas.filter((peli) =>
          peli.title.includes(title),
        );
      }

      if (tag) {
        pelisFiltradas = pelisFiltradas.filter((peli) =>
          peli.tags.includes(tag),
        );
      }

      return pelisFiltradas;
    }
    return await this.model.getAll();
  }

  async getOne(options: { id?: number }): Promise<Peli | undefined> {
    return (await this.get(options))[0];
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.model.getById(peli.id);
    if (peliExistente) {
      return false;
    }

    try {
      await this.model.add(peli);
      return true;
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
      return false;
    }
  }
}

export { PelisController };
