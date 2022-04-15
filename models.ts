import * as jsonfile from "jsonfile";
import { includes } from "lodash";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  films: Peli[] = [];
  options: any;
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.films = json;
      return json;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((films) => {
      const found = films.find((film) => {
        return film.id == id;
      });
      return found;
    });
  }
  search(options: any): Promise<Peli[]> {
    return this.getAll().then((films) => {
      var found = films;
      if (options.title && options.tag) {
        found = found.filter(
          (film) =>
            includes(film.title, options.title) &&
            includes(film.tags, options.tag)
        );
      } else if (options.title) {
        found = films.filter((film) => includes(film.title, options.title));
      } else if (options.tag) {
        found = found.filter((film) => includes(film.tags, options.tag));
      }
      return found;
    });
  }
  add(film: Peli): Promise<boolean> {
    const promiseOne = this.getById(film.id).then((existsFilm) => {
      if (existsFilm) {
        return false;
      } else {
        this.films.push(film);
        const promiseTwo = jsonfile.writeFile("./pelis.json", this.films);

        return promiseTwo.then(() => {
          return true;
        });
      }
    });

    return promiseOne;
  }
}

export { PelisCollection, Peli };
