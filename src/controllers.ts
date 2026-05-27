import { PelisCollection, Peli, SearchOptions } from "./models";

type Options = {
  id?: number;
  search?: SearchOptions;
};

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  get(options?: Options): Promise<Peli[]> {
    if (options?.id) {
      return this.model.getById(options.id).then((peli) => {
        if (peli) {
          return [peli];
        }

        return [];
      });
    }

    if (options?.search) {
      return this.model.search(options.search);
    }

    return this.model.getAll();
  }

  getOne(options: Options): Promise<Peli | undefined> {
    return this.get(options).then((pelis) => {
      return pelis[0];
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}

export { PelisController, Options };