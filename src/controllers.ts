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
    const lista = await this.model.getAll();
    let resultado;

    if (options?.id) {
      resultado = await this.model.getById(options.id);
      return resultado ? [resultado] : [];
    }

    if (options?.search) {
      resultado = await this.model.search(options.search);
      return resultado;
    }

    return lista;
  }
  async getOne(options: Options): Promise<Peli> {
    const pelis = await this.get(options);
    return pelis[0];
  }
  add(peli: Peli) {
    return this.model.add(peli);
  }
}
export { PelisController };
