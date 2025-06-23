import * as jsonfile from "jsonfile";
import { join } from "path";
import pelis from './pelis.json'

class Peli {
  id: number;
  title: string;
  tags: string[];

}

const pelisPath = join(__dirname, "pelis.json");

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {

  async getAll(): Promise<Peli[]> {
    var result = await jsonfile.readFile(pelisPath)
    return result
  }

  async getById(id:number):Promise<Peli> {
    var pelis = await this.getAll()

    var thePeli = pelis.find((p) => {
      return p.id == id
    })

    return thePeli
  }

  async add(peli:Peli):Promise<boolean> {
    const pelis = await this.getAll();

    const thePeli = pelis.find((p) => p.id === peli.id);
    if (thePeli) {
      return false;
    }

    pelis.push(peli);

    try {
      await jsonfile.writeFile(pelisPath, pelis);
      return true;
    } catch (err) {
      return false;
    }

  }

  async search(options:SearchOptions):Promise<Peli[]>{
    const lista = await this.getAll();


    const listaFiltrada = lista.filter((p) => {
      const matchesTitle = options.title ? p.title.toLowerCase().includes(options.title.toLowerCase()) : true;
      const matchesTag = options.tag ? p.tags.includes(options.tag) : true;
      return matchesTitle && matchesTag;

    });

    return listaFiltrada
  }
}


export { PelisCollection, Peli, SearchOptions };
