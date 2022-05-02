import { PelisCollection, Peli } from "./models";

class PelisController {
  listFilms: PelisCollection;
  constructor() {
    this.listFilms = new PelisCollection();
  }
  get(opciones) {
    if (opciones.id) {
      return this.listFilms.getById(opciones.id);
    } else if (opciones.search) {
      return this.listFilms.search(opciones.search); //.then((res) => res);
    } else {
      return this.listFilms.getAll();
    }
  }
  add(peli: Peli) {
    return this.listFilms.add(peli);
  }
}
export { PelisController };
