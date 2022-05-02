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
    //{tag:"algo"}
    return this.getAll().then((films) => {
      if (options.hasOwnProperty("title") && options.hasOwnProperty("tag")) {
        return films.filter((film) => {
          // logica para filtrar los tags y titles
          //si exite title:
          let isItTheSameTitle =
            film.title.toLowerCase() == options.title.toLowerCase() ||
            film.title.toLowerCase().split("").includes(options.title);

          let isItTheSameTag = film.tags.includes(options.tag.toLowerCase());

          if (isItTheSameTag && isItTheSameTitle) {
            return film;
          }
          if (isItTheSameTitle && !isItTheSameTag) {
            return film;
          }
          if (!isItTheSameTitle && isItTheSameTag) {
            return film;
          }
          /*  console.log(
            film.title.toLowerCase().split("").includes(options.title)
          ); */
        });
      }
      if (options.hasOwnProperty("title")) {
        //hago la logica de filtrar por titles
        //if (typeof options.title == "string") {
        return films.filter((film) => {
          let isItTheSameTitle =
            film.title.toLowerCase() == options.title.toLowerCase() ||
            film.title
              .toLowerCase()
              .split("")
              .includes(options.title.toLowerCase());

          if (isItTheSameTitle) {
            return film;
          }
          /* console.log(
            film.title
              .toLowerCase()
              .split("")
              .includes(options.title.toLowerCase())
          ); */
        });
        //}
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
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const promesaDos = this.getAll().then((pelis) => {
          const data = pelis.concat(peli);
          return jsonfile.writeFile("./pelis.json", data);
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
