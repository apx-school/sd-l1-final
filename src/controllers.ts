import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }

  async get(options: Options = {}): Promise<Peli[]> {

    if (options.id) {
      // busca por id
      const peliId = await this.model.getById(options.id);
      return peliId ? [peliId] : [];
    }

    if (options.search) {
      //busca por titulo o tag
      return await this.model.search(options.search);
    }
    return await this.model.getAll();
  }


  async getOne(options: Options = {}): Promise<Peli | null> { // Método para obtener una sola película
    const resultados = await this.get(options); // Llama al método get
    return resultados.length > 0 ? resultados[0] : null; // Devuelve la primera película o null si no hay resultados
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.model.add(peli);
  }

}



export { PelisController, Options };
