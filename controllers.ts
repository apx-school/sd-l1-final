import { PelisCollection, Peli } from "./models";

class PelisController {
  peliculas: PelisCollection;
  constructor() {
    this.peliculas = new PelisCollection();
  }
  get(options: any): Promise<any> {
    if (options.id) {
      return this.peliculas.getById(options.id).then((pelicula) => {
        return pelicula;
      });
    } else if (options.search) {
      const peliBuscada = this.peliculas
        .search(options.search)
        .then((pelicula) => {
          return pelicula;
        });
      return peliBuscada;
    } else if (options.tag) {
      const peliEncontrada = this.peliculas
        .search(options.tag)
        .then((pelicula) => {
          return pelicula;
        });
      return peliEncontrada;
    } else {
      return this.peliculas.getAll();
    }
  }
  add(peli: Peli) {
    return this.peliculas.add(peli);
  }
}

export { PelisController };
