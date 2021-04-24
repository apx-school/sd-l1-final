import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  promesa: Promise<any>;

  constructor() {
    this.pelis = new PelisCollection();
    let promesa = this.pelis.getAll();
    this.promesa = promesa;
  }

  get(options: any) {
    if (options.action == "esta vacio") {
      return this.pelis.getAll();
    }
    if (options.action == "get") {
      return this.pelis.getById(options.id);
    }
    if (options.action == "search" && options.params == "title") {
      return this.pelis.getAll().then(() => {
        return this.pelis.search(options.params, options.do);
      });
    }
    if (options.action == "search" && options.params == "tags") {
      return this.pelis.getAll().then(() => {
        return this.pelis.search(options.params, options.do);
      });
    }
  }

  add(options: any) {
    return this.pelis.add(options);
  }
}

export { PelisController };
