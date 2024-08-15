import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];
  async getAll() {
    const json = jsonfile.readFile("src/pelis.json");
    return json.then((data: Peli[]) => {
      this.pelis = data;
      return data;
    });
  }
  add(peli: Peli): Promise<Boolean> {
    const firstProm = this.getById(peli.id).then((res) => {
      if (res) {
        return false;
      } else {
        this.pelis.push(peli);
        const secondProm = jsonfile
          .writeFile("src/pelis.json", this.pelis)
          .then(() => {
            return true;
          });
        return secondProm;
      }
    });
    return firstProm;
  }
  async getById(id: number): Promise<Peli> {
    const allPelis = this.getAll();
    return allPelis.then((data) => {
      return data.find((p: Peli) => {
        if (p.id === id) {
          return p;
        }
      });
    });
  }
  async search(options: SearchOptions) {
    const pelis = await this.getAll();
    if (options.tag && options.title) {
      return pelis.filter((p: Peli) => {
        if (p.tags.includes(options.tag) && p.title.includes(options.title)) {
          return p;
        }
      });
    } else if (options.tag) {
      return pelis.filter((p: Peli) => {
        if (p.tags.includes(options.tag)) {
          return p;
        }
      });
    } else if (options.title) {
      return pelis.filter((p: Peli) => {
        if (p.title.includes(options.title)) {
          return p;
        }
      });
    }
  }
}
export { PelisCollection, Peli };
