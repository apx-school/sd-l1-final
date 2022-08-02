import { PelisCollection, Peli } from "./models";

class PelisController {
  instancia: PelisCollection;
  constructor() {
    this.instancia = new PelisCollection();
  }
  get(options) {
    if (options.id) {
      return this.instancia.getById(options.id);
    }
    if (options.add) {
      return this.instancia.add(options.add);
    }
    if (options.search) {
      if (options.search.title && options.search.tag) {
        return this.instancia.getAll().then((collection) => {
          return collection.filter((item) => {
            return (
              item.tags.includes(options.search.tag.toLowerCase()) &&
              item.title
                .toLowerCase()
                .includes(options.search.title.toLowerCase())
            );
          });
        });
      }
      if (options.search.title) {
        return this.instancia.getAll().then((collection) => {
          return collection.filter((item) => {
            return item.title
              .toLowerCase()
              .includes(options.search.title.toLowerCase());
          });
        });
      }
      if (options.search.tag) {
        return this.instancia.getAll().then((collection) => {
          return collection.filter((item) => {
            return item.tags.includes(options.search.tag.toLowerCase());
          });
        });
      }
    } else {
      return this.instancia.getAll();
    }
  }
  add(peli: Peli) {
    this.instancia.add(peli);
  }
}
export { PelisController };
