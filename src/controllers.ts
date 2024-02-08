import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelisCollection: PelisCollection;
  // constructor() {
  //   (async () => {
  //     this.pelisCollection = new PelisCollection();
  //     await this.pelisCollection.init();
  //   })();
  // }

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli | Peli[]> {
    // Sin parametros
    if (options == undefined) {
      return await this.pelisCollection.getAll();
    }
    // options con id
    if (options.id != undefined) {
      return await this.pelisCollection.getById(options.id);
    }
    // options con title y tag
    if (options.search) {
      const movies = await this.pelisCollection.search(options.search);
      return movies;
      // if (movies.length) {
      //   return movies;
      // } else {
      //   return "No se encontraron peliculas con esos filtros";
      // }
    }
  }

  async add(peli: Peli) {
    return await this.pelisCollection.add(peli);
  }
}

export { PelisController };
