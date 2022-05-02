import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll() {
    return jsonfile.readFile("./pelis.json").then((res) => {
      // la respuesta de la promesa
      return res;
    });
  }
  getById(id: number): Promise<any> {
    return this.getAll().then((films) => {
      return films.find((film) => {
        return film.id == id;
      });
    });
  }
  search(options: any): Promise<any> {
    const promise = this.getAll().then((films) => {
      if (options.hasOwnProperty("title") && options.hasOwnProperty("tag")) {
        //si exite title:
        // logica para filtrar los tags y titles
        return films.filter(
          (film) =>
            film.title.includes(options.title) &&
            film.tags.includes(options.tag.toLowerCase())
        );
      }
      if (options.hasOwnProperty("title")) {
        //hago la logica de filtrar por titles

        return films.filter((film) => film.title.includes(options.title));
      }
      if (options.hasOwnProperty("tag")) {
        // la misma logica pero para los tags

        return films.filter((film) => {
          let isItTheSameTag = film.tags.includes(options.tag.toLowerCase());
          //si exite tag:
          if (isItTheSameTag) {
            return film;
          }
        });
      }
    });
    return promise;
  }
  add(film: Peli): Promise<boolean> {
    const promiseOne = this.getById(film.id).then((existingMovie) => {
      if (existingMovie) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const promiseTwo = this.getAll().then((films) => {
          const data = films.concat(film);
          return jsonfile.writeFile("./pelis.json", data);
        });

        return promiseTwo.then(() => {
          return true;
        });
      }
    });

    return promiseOne;
  }
}

export { PelisCollection, Peli };
