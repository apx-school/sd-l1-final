import * as jsonfile from "jsonfile";
import * as find from "lodash/find";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];

  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      this.peliculas = pelis;
      return this.peliculas;
    });
  }

  getById(id: number): Promise<any> {
    return this.getAll().then((p) => {
      return find(p, { id: id });
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((res) => {
      if (options.search.title) {
        let peliculas = res;
        peliculas = peliculas.filter((pelicula) => {
          return pelicula.title.includes(options.search.title);
        });
        return peliculas;
      }
      if (options.search.tag) {
        let peliculas = res;
        peliculas = peliculas.filter((pelicula) => {
          return pelicula.tags.includes(options.search.tag);
        });
        return peliculas;
      }
      if (options.search.tag && options.search.title) {
        let peliculas = res;
        peliculas = peliculas.filter((pelicula) => {
          return (
            pelicula.tags.includes(options.search.tag) &&
            pelicula.title.includes(options.search.title)
          );
        });
        return peliculas;
      } else {
        return false;
      }
    });
  }
  //mètodo en proceso

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.peliculas.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.peliculas);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
