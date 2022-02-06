import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  constructor() {
    this.movies = new PelisCollection();
  }

  async get(options: any): Promise<any> {
    if (options.id) {
      var peliEncontrada = await this.movies.getById(options.id);
      return peliEncontrada;
    }
    if (options.search) {
      var resultadoBusqueda = await this.movies.search(options.search);
      return resultadoBusqueda;
    }
    if ({}) {
      return await this.movies.getAll();
    }
  }

  async add(peli: Peli) {
    return await this.movies.add(peli);
  }
}

export { PelisController }
