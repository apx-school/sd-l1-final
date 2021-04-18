import * as jsonfile from "jsonfile";
import * as concat from "lodash/concat";
import * as find from "lodash/find";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];

  getAll(): Promise<any> {
    return jsonfile.readFile("./peliculas.json").then((pelis) => {
      this.peliculas = pelis;
    });
  }

  getById(id: number): Promise<any> {
    const pelis = this.getAll();
    return pelis.then(() => {
      find(this.peliculas, { id: id });
    });
  }

  search(options: any): Promise<any> {
    if (options["title"]) {
      return this.getAll().then(() => {
        return find(this.peliculas, { title: options });
      });
    } else if (options["tag"]) {
      return this.getAll().then(() => {
        return this.peliculas.find((p) => {
          return p.tags.includes(options);
        });
      });
    }
  }

  //mètodo en proceso
  add(peli: Peli): Promise<any> {
    let operacionExitos: Promise<any>;
    let pelis = this.getAll();
    let encontrada = pelis.then(() => {
      find(pelis, peli);
    });
    if (encontrada) {
      return; // si fue encontrada no deveria hacer nada, solo mostrar mensaje
    } else if (!encontrada) {
      return; //agarrar las pelis, y agregarle la peli ... despues guardar y retornar la flag
    }
  }
}

export { PelisCollection, Peli };
