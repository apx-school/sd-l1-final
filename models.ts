import * as jsonfile from 'jsonfile';

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  listOfmovies: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('./pelis.json').then((pelis) => {
      this.listOfmovies = pelis;
      return this.listOfmovies;
    });
  }

  getById(id: number) {
    return this.getAll().then((movies: Peli[]) => {
      return movies.find((movie) => {
        return movie.id == id;
      });
    });
  }

  search(options: any) {
    return this.getAll().then((movies) => {
      return movies.filter((movie) => {
        const titleWanted = options.title;
        const movieTitle = movie.title;
        const tagsWanted = options.tag;
        const movietags = movie.tags;

        if (titleWanted && !tagsWanted) {
          return movieTitle.includes(titleWanted);
        } else if (tagsWanted && !titleWanted) {
          return movietags.includes(tagsWanted);
        } else if (tagsWanted && titleWanted) {
          return (
            movieTitle.includes(titleWanted) && movietags.includes(tagsWanted)
          );
        }
      });
    });
  }

  add(peli: Peli) {
    return this.getById(peli.id).then((movieToAdd) => {
      if (movieToAdd || !peli) {
        return false;
      } else if (!movieToAdd) {
        this.listOfmovies.push(peli);
        const movieAdded = jsonfile.writeFile('pelis.json', this.listOfmovies);
        return movieAdded.then(() => {
          return true;
        });
      }
    });
  }
}

export { PelisCollection, Peli };
