import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
class PelisController {
  movies: PelisCollection;
  constructor() {
    this.movies = new PelisCollection();
  }

  async processOptions(opt: any) {
    // console.log(opt);
    if (!opt) {
      return await this.movies.getAll();
    } else if (opt.get) {
      return await this.getOne(opt.get);
    } else if (opt.search) {
      return await this.get(opt);
    } else if (opt.add) {
      return await this.add(opt.add);
    } else {
      throw new Error("Datos ingresados no válidos");
    }
  }

  async get(options?: Options): Promise<Peli[]> {
    const peliculas = this.movies;
    let pelisEncontradas: Peli[] = [];

    if (!options) {
      pelisEncontradas = await peliculas.getAll();
    } else if (options.search) {
      pelisEncontradas = await peliculas.search(options.search);
    } else if (options.id) {
      const peli = await peliculas.getById(options.id);
      pelisEncontradas = peli ? [peli] : [];
    } else {
      throw new Error("Datos ingresados no válidos!!!");
    }

    return pelisEncontradas;
  }

  async getOne(options: Options): Promise<Peli> {
    const peliEncontrada: Peli[] = await this.get(options);
    return peliEncontrada[0];
  }

  async add(peli: Peli) {
    await this.movies.add(peli);
    return "Película añadida con exito";
  }
}
export { PelisController };
