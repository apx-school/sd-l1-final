
import { PelisCollection, Peli } from "./models";
const pelisCollection = new PelisCollection();

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  constructor() {}

  async get(options: Options): Promise<Peli | Peli[]> {
    if (options.search) {
      const peliculas = await pelisCollection.search(options.search);
      return peliculas.length === 1 ? peliculas[0] : peliculas;
    } else if (options.id) {
      return await pelisCollection.getById(options.id);
    } else {
      return await pelisCollection.getAll();
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return await pelisCollection.add(peli);
  }
}

export { PelisController };


