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
      let pelis = res;
      let aux;
      if (options.title) {
        aux = pelis.filter((p) => {
          return p.title.includes(options.title);
        });
      }
      if (options.tags) {
        aux = pelis.filter((p) => {
          return p.tags.includes(options.tags);
        });
      }
      if (options.tags && options.title) {
        aux = pelis.filter((p) => {
          return (
            p.tags.includes(options.tags) && p.title.includes(options.title)
          );
        });
      } else {
        aux = "no hay tal peli";
      }
      return aux;
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
