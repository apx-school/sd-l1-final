import * as jsonfile from "jsonfile";
import * as pelis from "./pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  promise: Promise<any>;
  constructor() {
    const promesa = this.getAll();
    this.promise = promesa;
  }

  getAll(): Promise<any> {
    const promise = jsonfile.readFile("./pelis.json").then((i) => {
      this.pelis = i;
      return this.pelis;
    });
    return promise;
  }
  getById(id: Number) {
    return this.getAll().then(() => {
      const resultado = this.pelis.find((i) => {
        return i.id == id;
      });
      return resultado;
    });
  }

  search(options: any) {
    return this.promise.then((pelis) => {
      return this.pelis.filter((i) => {
        if (options.title && options.tag) {
          return (
            i.title.toLowerCase().includes(options.title) &&
            i.tags.includes(options.tag)
          );
        } else if (options.tag) {
          return i.tags.includes(options.tag);
        } else if (options.title) {
          return i.title.toLowerCase().includes(options.title);
        } else {
          return this.getAll();
        }
      });
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.pelis.push(peli);
        const peliculas = this.pelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
