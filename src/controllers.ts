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
  get(options: Options) {
    if (!options) {
      return this.pelis.getAll();
    }
    if (options.id !== undefined) {
      return this.pelis.getById(options.id).then((peli) => {
        if (peli) {
          return [peli];
        } else {
          return [];
        }
      });
    }
    if (options.search) {
      return this.pelis.search(options.search);
    }
    return this.pelis.getAll();
  }
  getOne(options: Options) {
    return this.get(options).then((pelis) => {
      return pelis[0];
    });
  }
  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
