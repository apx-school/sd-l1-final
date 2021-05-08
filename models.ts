import * as jsonfile from "jsonfile";
import { includes, find } from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis2.json").then((p) => {
      this.peliculas = p;
      return p;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then(() => {
      return find(this.peliculas, (p) => {
        return p.id == id;
      });
    });
  }
  search(options: any): Promise<Peli[]> {
    return this.getAll().then((p) => {
      let respuesta = p;
      if (options.title) {
        respuesta = respuesta.filter((c) => includes(c.title, options.title));
      }
      if (options.tag) {
        respuesta = respuesta.filter((c) => includes(c.tags, options.tag));
      }

      return respuesta;
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.peliculas.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis2.json", this.peliculas);

        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
