import { PelisCollection, Peli } from "./models";
class PelisController {
  peliculas:PelisCollection
  promesa: Promise <any>
  constructor() {
    let pelis = new PelisCollection
    this.peliculas = pelis
    const laPreomesa = this.peliculas.getAll();
    this.promesa = laPreomesa;
  }
  get(options): Promise<any> {
    if (options.id) {
      return this.peliculas.getById(options.id);
    }
    if (options.search) {
      return this.peliculas.search(options.search);
    } else {
      return this.peliculas.getAll();
    }
  }

  add(peli) {
    return this.peliculas.add(peli);
  }

}
export { PelisController };
