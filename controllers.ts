import { PelisCollection, Peli } from "./models";

class PelisController {
  films: PelisCollection;
  constructor() {
    this.films = new PelisCollection();
  }
  get(options: any) {
    if (options.id) {
      return this.films.getById(options.id);
    } else if (options.search) {
      return this.films.search(options.search);
    } else {
      return this.films.getAll();
    }
  }
  add(film: Peli) {
    return this.films.add(film);
  }
}
export { PelisController };
