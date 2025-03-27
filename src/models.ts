import * as jsonfile from 'jsonfile';

export interface Movie {
  id: number;
  title: string;
  tags: string[];
}

interface SearchOptions {
  title?: string;
  tag?: string;
}

const MOVIES_FILE = './movies.json';

export class MoviesCollection {
  private async readMovies(): Promise<Movie[]> {
    try {
      return await jsonfile.readFile(MOVIES_FILE);
    } catch {
      return [];
    }
  }

  private async writeMovies(movies: Movie[]): Promise<void> {
    await jsonfile.writeFile(MOVIES_FILE, movies);
  }

  async getAll(): Promise<Movie[]> {
    return this.readMovies();
  }

  async add(movie: Movie): Promise<boolean> {
    const movies = await this.readMovies();

    const movieExists = await this.getById(movie.id);
    if (movieExists) {
      return false;
    }

    movies.push(movie);
    await this.writeMovies(movies);
    return true;
  }

  async getById(id: Movie['id']): Promise<Movie | undefined> {
    const movies = await this.readMovies();
    return movies.find((movie) => movie.id === id);
  }

  async search(options: SearchOptions): Promise<Movie[]> {
    const movies = await this.readMovies();

    return movies.filter((movie) => {
      const { tag, title } = options;
      const coincideTag = !tag || movie.tags.includes(tag);
      const coincideTitle = !title || movie.title.includes(title);
      return coincideTag && coincideTitle;
    });
  }
}
