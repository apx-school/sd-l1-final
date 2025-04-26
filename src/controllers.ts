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
      const movies = await this.model.getAll();

      if (options?.id) {
        const movie = movies.find(movie => movie.id === options.id);
        return movie ? [movie] : [];
      } else if (options?.search?.title && options?.search?.tag) {
        return movies.filter(
          movie => movie.title.toLowerCase().includes(options.search.title.toLowerCase()) && movie.tags.includes(options.search.tag.toLowerCase())
        );
      } else if (options?.search?.title) {
        return movies.filter(movie => movie.title.toLowerCase().includes(options.search.title.toLowerCase()));
      } else if (options?.search?.tag) {
        return movies.filter(movie => movie.tags.includes(options.search.tag.toLowerCase()));
      }

      return movies;
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
