import * as jsonfile from "jsonfile";
import * as reverse from "lodash/reverse";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];
  async getAll(): Promise<Peli[]> {
    let peli = await jsonfile.readFile(__dirname + "/pelis.json");
    return (this.pelis = peli);
  }

  async getById(id: number) {
    let searchId = this.getAll().then((result) => {
      return result.find((item) => {
        if (item.id === id) {
          return item;
        }
      });
    });
    return searchId;
  }

  async search(options: any) {
    let result;
    await this.getAll();
    if (options.title && options.tag) {
      return this.pelis.filter((i) => {
        return i.title.includes(options.title) && i.tags.includes(options.tag);
      });
    }
    if (options.title) {
      result = await this.getAll().then((result) => {
        return result.filter((item) =>
          item.title.toLowerCase().includes(options.title)
        );
      });
    }

    if (options.tag) {
      result = await this.getAll().then((result) => {
        return result.filter((item) => {
          return item.tags.includes(options.tag.toLowerCase());
        });
      });
    }

    return result;
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((i) => {
          i.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", i);
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
