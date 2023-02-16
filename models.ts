import * as jsonfile from "jsonfile";
import { includes} from "lodash"

type SearchOptions = { title?: any; tag?: string };
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[]=[];
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json").then((pelis) => {
      this.pelis = pelis;
      return pelis;
    });
  };
  async getById(id: number): Promise<Peli> {
    const buscarId = (await this.getAll()).find((peli) => peli.id == id);
    return buscarId;
  };
  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((listaDePelis) => {
          listaDePelis.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", listaDePelis);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
  async search(options: SearchOptions): Promise<any> {
    
   const listas = await this.getAll();
    if (options.title && options.tag) {
      return listas.filter((peli) => {
        return (
          peli.title.includes(options.title) && peli.tags.includes(options.tag)
        );
      });
    }
    if (options.title) {
      return listas.filter((peli) => {
        return peli.title.includes(options.title);
      });
    }
    if (options.tag) {
      return listas.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
    }
  }
}
export { PelisCollection, Peli };