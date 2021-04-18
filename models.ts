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
    let flag: Boolean;
    let pelis = this.getAll();
    pelis.then((pelis) => {});
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
