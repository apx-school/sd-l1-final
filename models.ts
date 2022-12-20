import { readFile } from "fs/promises";
import * as jsonfile from "jsonfile";
import { pull } from "lodash/pull";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peli: Peli[];

  getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile(__dirname + "/pelis.json")
      .then((pelis: Peli[]) => {
        this.peli = pelis;
        return pelis;
      });
  }

  async getById(id: number): Promise<Peli> {
    await this.getAll();
    const peliEncontrada = await this.peli.find((lista) => id === lista.id);
    return peliEncontrada;
  }

  async search(option: any): Promise<any> {
    await this.getAll();

    if (option.title && !option.tags) {
      const titleMovie = this.peli.filter((lista) => {
        if (
          lista.title
            .toLocaleLowerCase()
            .includes(option.title.toLocaleLowerCase())
        ) {
          return console.log(lista);
        }
      });

      return titleMovie;
    }

    if (option.tags && !option.title) {
      const tagMovie = this.peli.find((lista) => {
        if (
          lista.tags
            .toLocaleString()
            .toLocaleLowerCase()
            .includes(option.tags.toLocaleLowerCase())
        ) {
          return console.log(lista);
        }
      });

      return tagMovie;
    }

    if (option.tags && option.title) {
      const totalMovie = this.peli.filter((lista) => {
        if (
          lista.title
            .toLocaleLowerCase()
            .includes(option.title.toLocaleLowerCase()) &&
          lista.tags
            .toLocaleString()
            .toLocaleLowerCase()
            .includes(option.tags.toLocaleLowerCase())
        ) {
          console.log(lista);
        }
      });

      return totalMovie;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then(() => {
          this.peli.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", this.peli);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
