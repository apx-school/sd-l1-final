import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options?): Promise<Peli | Peli[]> {
    // no recibo opciones, traigo todas las películas
    if (!options) {
      return this.pelis.getAll();
    }
    // recibo la propiedad id
    if (options.id) {
      return this.pelis.getById(options.id);
    }
    // recibo el objeto options.search
    if (options.search) {
      if (options.search.title && options.search.tag) {
        return this.pelis.search(options.search);
      } else {
        return this.pelis.search(options.search);
      }
    }
  }

  add(peli: Peli) {
    return this.pelis.add(peli).then((res) => res);
  }
}
export { PelisController };
