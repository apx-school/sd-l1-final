import * as jsonfile from "jsonfile";
import { formatWithOptions } from "util";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  async getAll(): Promise<any> {
    const json = await jsonfile.readFile("./pelis.json").then((resp) => {
      return resp;
    });
    this.peliculas = json;
    return this.peliculas;
  }
  async getById(id: number) {
    return await this.getAll().then((peliculas) => {
      return peliculas.find((peli) => {
        return peli.id == id;
      });
    });
  }
  async search(option: any) {
    const peli = await this.getAll();
    if (option.title && option.tag) {
      return peli.filter(
        (pelis) =>
          pelis.title.includes(option.title) && pelis.tags.includes(option.tag)
      );
    } else if (option.title) {
      return peli.filter((pelis) => pelis.title.includes(option.title));
    } else if (option.tag) {
      return peli.filter((pelis) => pelis.tags.includes(option.tag));
    }
  }

  async add(peli: Peli) {
    const promesaUno = this.getById(peli.id).then((pelisExistente) => {
      if (pelisExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((pelis) => {
          const data = pelis.concat(peli);
          return jsonfile.writeFile("./pelis.json", data);
        });
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return await promesaUno;
  }
}

export { PelisCollection, Peli };
