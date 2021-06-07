import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  peli: Peli;
  constructor() {
    const peliColl = new PelisCollection();
    this.peliculas = peliColl;
    this.peli = new Peli();
  }
  processOptions(options) {
    if (options.get) {
      return this.get(options.get);
    } else if (options.search) {
      return this.get(options.search);
    } else if (options.add) {
      return this.add(options.add);
    } else {
      return this.peliculas.getAll();
    }
  }

  get(options) {
    if (options.id) {
      return this.peliculas.getById(options.id);
    } else if (options.title && !options.tags) {
      return this.peliculas.search(options);
    } else if (options.tags && !options.title) {
      return this.peliculas.search(options);
    } else if (options.title && options.tags) {
      const resultado = this.peliculas.search(options).then((peli) => {
        const filtrado = peli.filter((p) => {
          return p.tags.includes(options.tags);
        });
        return filtrado;
      });

      return resultado;
    }
  }
  add(peli: Peli) {
    return this.peliculas.add(peli);
  }
}
export { PelisController };
