import { PelisCollection, Peli } from './models';

class PelisController {
  movies: PelisCollection;
  promise: Promise<any>;

  constructor() {
    this.movies = new PelisCollection();
    const promise = this.movies.getAll();
    this.promise = promise;
  }

  get(options: any) {
    return this.promise.then(() => {
      if (options.id) {
        return this.movies.getById(options.id);
      } else if (options.search) {
        return this.movies.search(options.search);
      } else if (options.result) {
        return this.promise;
      }
    });
  }

  add(movieToAdd) {
    return this.movies.add(movieToAdd);
  }
}
export { PelisController };
