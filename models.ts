import * as jsonfile from "jsonfile";
import { find, includes } from "lodash"

type SearchOptions = { title?: any; tag?: string };
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json").then((pelis) => {
      this.pelis = pelis;
      return pelis;
    });
  };
  async getById(id: number): Promise<Peli> {
    await this.getAll()
    const buscarId = find(this.pelis, (p) => p.id == id)
    return buscarId;
  };
  async add(peli: Peli): Promise<boolean> {
    await this.getAll();
    if (await this.getById(peli.id)) {
      return false;
    } else {
      this.pelis.push(peli);
      await jsonfile.writeFile("./pelis.json", this.pelis);
      return true;
    }
  };
  async search(options: SearchOptions) {

    const lista = await this.getAll();
    const listaFiltrada = lista.filter((peli) => {
      let esteVa = false;
      if (options.tag) {
        esteVa = includes(peli.tags, options.tag)
      } else if (options.title) {
        esteVa = includes(peli.title.charAt(0).toLowerCase(), options.title)
      }
      return esteVa;

    });
    if (options.tag && options.title) {
      return listaFiltrada.filter((peli) => {
        return includes(peli.title.charAt(0).toLowerCase(), options.title)
      });
    }
    console.log(listaFiltrada);

  }
}
export { PelisCollection, Peli };
