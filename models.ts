import * as jsonfile from 'jsonfile';

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('pelis.json');
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
    return this.getAll().then((movies) => {
      const addMovie = movies.every((movie) => {
        if (peli.id == movie.id || !peli.id) {
          return false;
        } else if (peli.id != movie.id) {
          return true;
        }
      });

      if (addMovie == true) {
        movies.push(peli);
        jsonfile.writeFile('pelis.json', movies);
        return true;
      } else if (addMovie == false) {
        return false;
      }
    });
  }
}

export { PelisCollection, Peli };

// const test = new PelisCollection();
// const result = test.getById(3);
// result.then((r) => {
//   console.log(r);
// });
