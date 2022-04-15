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

  search(params: any): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      let res: Peli[] = [];

      if (params.title && params.tag) {
        res = pelis.filter((p) => {
          return (
            p.title.toLowerCase().includes(params.title) &&
            p.tags.includes(params.tag)
          );
        });
      } else if (params.title) {
        res = pelis.filter((p) => {
          return p.title.toLowerCase().includes(params.title);
        });
      } else if (params.tag) {
        res = pelis.filter((p) => {
          return p.tags.includes(params.tag);
        });
      }
      return res;
    });
  }

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
