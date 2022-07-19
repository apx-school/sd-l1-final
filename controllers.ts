import { PelisCollection, Peli } from "./models";

class PelisControllerOptions {
  id: number;
  search: {
    title: string;
    tag: string;
  };
}

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options: any): Promise<any> {
    if (options) {
      if (options.id) {
        return await this.pelis.getById(options.id);
      } else if (options.search) {
        return await this.pelis.search(options.search);
      }
    } else return await this.pelis.getAll();
  }

  async add(peli: Peli) {
    await this.pelis.add(peli);
  }
}
export { PelisController, PelisControllerOptions };
