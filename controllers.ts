import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options: any) {
    if (options.action == "esta vacio papurri") {
      return this.pelis.getAll();
    }
    if (options.id) {
      return this.pelis.getById(options.id);
    }
    // if (options.search) {
    //   return this.pelis.search(options);
    // }
    if (options.search) {
      let aux = {
        title: options.search.title,
        tag: options.search.tag,
      };
      return this.pelis.search(aux).then((res) => {
        return res;
      });
    }
  }

  add(objeto: Peli) {
    return this.pelis.add(objeto);
  }
}

export { PelisController };
