import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }
  async get(options): Promise<any> {
    if (options.id) {
      return this.peliculas.getById(options.id); // Si options tiene id
    } else if (options.search) {
      return this.peliculas.search(options.search); // Si options tiene search
    } else if ({}) {
      return this.peliculas.getAll(); // sino, devuelve todo
    }
  }
  async add(peli: Peli): Promise<boolean> {
    return this.peliculas.add(peli);
  }
}
export { PelisController };
