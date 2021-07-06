import * as jsonfile from "jsonfile";
import { formatWithOptions } from "node:util";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((res) => {
      this.pelis = res;
      return res;
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      return pelis.find((i) => {
        return i.id == id;
      });
    });
  }

  search(options: any) {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((i) => {
          return (
            i.title.includes(options.title) && i.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return pelis.filter((i) => {
          return i.title.includes(options.title);
        });
      } else if (options.tag) {
        return pelis.filter((i) => {
          return i.tags.includes(options.tag);
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.pelis.push(peli);
        const data = this.pelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
