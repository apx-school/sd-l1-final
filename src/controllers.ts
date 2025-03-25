import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  modelo: PelisCollection;

  constructor() {
    this.modelo = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    const busca = await this.modelo.getAll();
    if (options?.id) {
      const peli = await this.modelo.getById(options.id);
      return peli ? [peli] : [];
    } else if (options?.search) {
      return busca.filter((peli) => {
        const tituloEncontrado = options.search.title ? peli.title.toLocaleLowerCase().includes(options.search.title.toLocaleLowerCase()) : true;
        const tagEncontrado = options.search.tag ? peli.tags.includes(options.search.tag) : true;
        return tagEncontrado && tituloEncontrado;
      });
    } else {
      return busca;
    }
  }

  async getOne(options: Options): Promise<Peli | undefined> {
    try {
      const resultados = await this.get(options);
      return resultados[0];
    } catch (error) {
      console.error("No se pudo cargar la película");
      throw error;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      return await this.modelo.add(peli);
    } catch (error) {
      console.error("No se pudo agregar la película", error);
      throw error;
    }
  }
}

export { PelisController };
