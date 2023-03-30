import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  async get(options?: Options): Promise<any> {
    console.log(`options: ${options}`);

    if (Object.keys(options).length == 0) {
      return await this.pelis.getAll();
    }

    if (options.id) {
      return await this.pelis.getById(options.id);
    }

    if (options.search) {
      return await this.pelis.search(options.search);
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.pelis.add(peli);
  }
}

/* PRUEBAS:
//  */
// const peliController = new PelisController();
// peliController.pelis.getAll().then((res) => console.table(res));

export { PelisController };
