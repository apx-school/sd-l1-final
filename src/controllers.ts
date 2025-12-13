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
    if (!options) {
      return this.model.getAll();
    }

    if (options.id) {
      const peli = await this.model.getById(options.id);
      if (options.search) {
        const pelisFound = await this.model.search(options.search);
        if (pelisFound.find((p) => p.id === peli.id)) {
          return [peli];
        } else {
          return [];
        }
      }
      return peli ? [peli] : [];
    }
    if (options.search) {
      return this.model.search(options.search);
    }
    return this.model.getAll(); // Asegúrate de devolver todas las pelis si no hay parámetros
  }

  getOne(options: Options): Promise<Peli> {
    return this.model.getById(options.id);
  }

  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController, Options };

/* let controller = new PelisController();

controller.get({ id: 2, search: { title: "ghost" } }).then((pelis) => {
  console.log("controller.get(...)...");
  console.log(pelis);
}); */
