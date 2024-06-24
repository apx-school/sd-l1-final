import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
type TerminalParams = {
  action: string;
  id: number;
  title: string;
  tags?: string[];
  tag?: string;
};
// SEGUIR CON EL ADD
class PelisController {
  currentPeliColl: PelisCollection;
  promise: Promise<any>;
  constructor() {
    this.currentPeliColl = new PelisCollection();
    this.promise = this.currentPeliColl.getAll();
  }
  add(peli: Peli) {
    return this.currentPeliColl.add(peli);
  }
  get(options: Options) {
    return this.currentPeliColl.getAll().then(() => {
      if (options.id) {
        const result = this.currentPeliColl.getById(options.id).then((res) => {
          return res;
        });
        return result;
      } else if (options.search.title && options.search.tag) {
        const result = this.currentPeliColl
          .search({
            title: options.search.title,
            tag: options.search.tag,
          })
          .then((res) => res);
        return result;
      } else if (options.search.title) {
        const result = this.currentPeliColl.search({
          title: options.search.title,
        });
        return result;
      } else if (options.search.tag) {
        const result = this.currentPeliColl
          .search({ tag: options.search.tag })
          .then((res) => {
            return res;
          });
        return result;
      } else {
        return this.currentPeliColl.pelis;
      }
    });
  }
  processOptions(options: TerminalParams) {
    if (options.action === "add") {
      const peliForm = {
        id: options.id,
        title: options.title,
        tags: options.tags,
      };
      return this.add(peliForm);
    }
    if (options.action === "get") {
      return this.get(options);
    }
    if (options.action === "search") {
      let formatted = {
        search: {
          title: options.title,
          tag: options.tag,
        },
      };
      return this.get(formatted);
    }
  }
}
export { PelisController };