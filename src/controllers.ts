import { PelisCollection, Peli } from "./models";
import { SearchOptions } from "./models";

type Options = {
  id?: number;
  search?: SearchOptions;
};

class PelisController {
  model: PelisCollection;
  constructor() {
    const obj = new PelisCollection();
    this.model = obj;
  }

  async get(options: Options) {
    if (options.id) {
      return this.model.getById(options.id).then((p) => {
        return p;
      });
    }
    if (options.search) {
      const buscarPeli = await this.model.search(options.search);
      return buscarPeli;
    }
  }
}
export { PelisController };

const objeto = new PelisController();
