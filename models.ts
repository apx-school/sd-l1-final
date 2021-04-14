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
      return pelis;
    });
  }

  getById(id: number): Peli {
    let encontrada = find(this.peliculas, { id: id });
    return encontrada;
  }
  search(options: any): Peli {
    if (options["title"]) {
      return find(this.peliculas, { title: options });
    } else if (options["tag"]) {
      return find(this.peliculas, { tags: options });
    }
  }
  add(peli: Peli) {
    let flag: Boolean;

    if (!find(this.peliculas, peli)) {
      flag = false;
      return flag;
    } else {
      const data = new Promise((resolve) => {
        resolve(concat(peli, this.peliculas));
      });
      data.then(() => {
        this.peliculas = jsonfile.writeFile("./pelis.json", this.peliculas);
        flag = true;
        return flag;
      });
    }
  }
}

export { PelisCollection, Peli };
