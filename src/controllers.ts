import { PelisCollection, Peli } from './models';

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    try {
      const peliculas = await this.model.getAll();

      if (options?.id) {
        const pelicula = peliculas.find(pelicula => pelicula.id === options.id);
        return pelicula ? [pelicula] : [];
      } else if (options?.search?.title && options?.search?.tag) {
        return peliculas.filter(
          pelicula => pelicula.title.toLowerCase().includes(options.search.title.toLowerCase()) && pelicula.tags.includes(options.search.tag)
        );
      } else if (options?.search?.title) {
        return peliculas.filter(pelicula => pelicula.title.toLowerCase().includes(options.search.title.toLowerCase()));
      } else if (options?.search?.tag) {
        return peliculas.filter(pelicula => pelicula.tags.includes(options.search.tag));
      }

      return peliculas;
    } catch (error) {
      console.error('Oops, algo ha salido mal', error);
      return [];
    }
  }

  async getOne(options: Options): Promise<Peli> {
    const result = await this.get(options);
    if (result.length === 0) {
      throw new Error('No hay resultados');
    }

    return result[0];
  }

  async add(peli: Peli): Promise<boolean> {
    return this.model.add(peli);
  }
}
export { PelisController };
