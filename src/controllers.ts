import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  Pelis: PelisCollection;
  constructor() {
    this.Pelis = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli | Peli[]> {
    
    if (options == undefined) {
      return await this.Pelis.getAll();
    }
    
    if (options.id != undefined) {
      return await this.Pelis.getById(options.id);
    }
    
    if (options.search) {
      const movies = await this.Pelis.search(options.search);
      return movies;
      // if (movies.length) {
      //   return movies;
      // } else {
      //   return "No se encontraron peliculas con esos filtros";
      // }
    }
  }

  async add(peli: Peli):Promise<boolean> {
    return await this.Pelis.add(peli);
  }
}
export { PelisController };
