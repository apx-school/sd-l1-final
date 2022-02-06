import * as jsonfile from "jsonfile";
import { pull } from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    var answer = await jsonfile.readFile("./pelis.json");
    return answer;
  }
  async getById(id: number): Promise<Peli> {
    var answer = await this.getAll().then((pelis) => {
      const peliEncontrada = pelis.find((x) => {
        return x.id == id;
      });
      return peliEncontrada;
    });
    return answer;
  }
  async search(options: any) {
    if (options.title && !options.tag) {
      return await this.getAll().then((pelis) => {
        const pelisFiltradasTitle = pelis.filter((x) =>
          x.title.includes(options.title)
        );
        return pelisFiltradasTitle;
      });
    } else if (options.tag && !options.title) {
      return await this.getAll().then((pelis) => {
        const pelisFiltradasTags = pelis.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
        return pelisFiltradasTags;
      });
    } else if (options.title && options.tag) {
      const filtroTitle = await this.getAll().then((pelis) => {
        const pelisFiltradasTitle = pelis.filter((x) => {
          return x.title.includes(options.title);
        });
        return pelisFiltradasTitle;
      });
      const filtroTags = filtroTitle.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
      return filtroTags;
    }
  }
  async add(peli: Peli): Promise<boolean> {
    if (
      await this.getById(peli.id).then((res) => {
        return res;
      })
    ) {
      return false;
    } else {
      const misPelis = await this.getAll().then((res) => {
        return res;
      });
      misPelis.push(peli);
      await jsonfile.writeFile("./pelis.json", misPelis);
      return true;
    }
  }
}

export { PelisCollection, Peli };
