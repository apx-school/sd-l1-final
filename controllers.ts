import { PelisCollection, Peli } from "./models";

class PelisControllerOptions {
  id: number;
  search: {
    title: string;
    tag: string[];
  };
}

class PelisController {
  pelisCollection: PelisCollection;
  constructor() {
    const pelisCollection = new PelisCollection();
    this.pelisCollection = pelisCollection;
  }
  get(options: PelisControllerOptions) {
    if (options.id) {
      return this.pelisCollection.getById(options.id);
    } else if (options.search) {
      if (options.search.title) {
        return this.pelisCollection.search(options.search.title);
      } else if (options.search.tag) {
        return this.pelisCollection.search(options.search.tag);
      } else if (options.search.title && options.search.tag) {
        return (
          this.pelisCollection.search(options.search.title) &&
          this.pelisCollection.search(options.search.tag)
        );
      } else {
        return this.pelisCollection.getAll();
      }
    }
  }
  add(peli: Peli) {
    return this.pelisCollection.add(peli);
  }
}
export { PelisController, PelisControllerOptions };
