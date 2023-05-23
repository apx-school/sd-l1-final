import { promises } from "fs";
import * as jsonfile from "jsonfile";
import * as includes from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: any; tag?: string };

class PelisCollection {
  listaPeliculas: Peli[];
  async getAll(): Promise<Peli[]> {
    const pelis = await jsonfile.readFile("./pelis.json");
    this.listaPeliculas = pelis;
    return pelis;
  }
  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then(() => {
          this.listaPeliculas.push(peli);
          const promesaDos = jsonfile.writeFile(
            "./pelis.json",
            this.listaPeliculas
          );
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
  // Devuelve la peli con el id que se le pase por parámetro.
  async getById(id: number): Promise<Peli> {
    const todas = await this.getAll();
    const encontrado = todas.find((peli) => peli.id == id);
    return encontrado;
  }
  async search(options: SearchOptions) {
    if (options.title && options.tag) {
      let esteVa;
      esteVa = this.getAll().then((res) => {
        return res.filter((res) => res.title.includes(options.title));
      });
      return esteVa.then((res) => {
        return res.filter(
          (res) => res.tags.filter((res) => res == options.tag) == options.tag
        );
      });
    } else if (options.title) {
      return this.getAll().then((res) => {
        return res.filter((res) => res.title.includes(options.title));
      });
    } else if (options.tag) {
      return this.getAll().then((res) => {
        return res.filter((res) => res.tags.includes(options.tag));
      });
    }
  }
}

export { PelisCollection, Peli };
