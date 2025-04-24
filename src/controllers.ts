import * as jsonfile from 'jsonfile';
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

  async getOne(options: Options): Promise<Peli | undefined> {
    const results = await this.get(options);
    return results && results.length > 0 ? results[0] : undefined;
  }

  async add(peli: Peli) {
    try {
      const result = await this.model.add(peli);
      if (result) {
        console.log('Pelicula agregada exitosamente');
      } else {
        console.log('No se pudo agregar la película. Puede que ya exista');
      }

      return result;
    } catch (error) {
      console.error('Oops, algo ha salido mal al intentar guardar la película:', error);
      return false;
    }
  }
}
export { PelisController };
