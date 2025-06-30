import { PelisCollection, Peli } from "./models";
import * as jsonfile from "jsonfile";

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
    if (options?.id) {
      const peli = await this.model.getById(options.id);
      return peli ? [peli] : [];
    } else if (options?.search) {
      return await this.model.search(options.search);
    } else {
      return await this.model.getAll();
    }
  }

  async getOne(options: Options): Promise<Peli | null> {
    const resultados = await this.get(options);
    return resultados.length > 0 ? resultados[0] : null;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.model.getById(peli.id);

    if (peliExistente) {
      return false; 
    }

    const pelisActuales = await this.model.getAll();
    pelisActuales.push(peli);

    await jsonfile.writeFile("./src/pelis.json", pelisActuales);
    return true;
  }
}

export { PelisController };
