import { MoviesCollection, Movie } from './models';

export interface SearchOptions {
  title?: string;
  tag?: string;
}

export interface Options {
  id?: number;
  search?: SearchOptions;
}

export class MovieController {
  private readonly movies: MoviesCollection;

  constructor() {
    this.movies = new MoviesCollection();
  }

  async get(options?: Options): Promise<Movie[]> {
    if (!options) {
      return this.movies.getAll();
    }

    const { id, search } = options;

    if (id) {
      const movie = await this.movies.getById(id);
      return movie ? [movie] : [];
    }

    if (search) {
      return this.movies.search(search);
    }

    return this.movies.getAll();
  }

  async getOne(options?: Options): Promise<Movie | undefined> {
    const movies = await this.get(options);
    return movies[0];
  }

  async add(movie: Movie): Promise<void> {
    await this.movies.add(movie);
  }
}
