import { PelisCollection, Pelicula } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  data: PelisCollection;

  constructor() {
    this.data = new PelisCollection();
  }

  async get(options?: Options) {
    if(options.id) {
      return await this.data.getById(options.id);
    } else if(options.search) {
      return await this.data.search(options.search);
    } else {
      return await this.data.getAll();
    }
  }

  async add(pelicula: Pelicula) {
    return await this.data.add(pelicula);
  }

}
export { PelisController };
