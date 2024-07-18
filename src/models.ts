import * as jsonfile from "jsonfile";
import "./pelis.json";

type SearchOptions = { title?: string; tag?: string };

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json");
  }
  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.getAll();
    const peliRep = pelis.find((p) => {
      return p.id == peli.id;
    });
    if (!peliRep) {
      pelis.push(peli);
      jsonfile.writeFile(__dirname + "/pelis.json", pelis);
      return true;
    } else {
      return false;
    }
  }
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    const peliEncontrada = pelis.find((p) => {
      return p.id == id;
    });
    return peliEncontrada;
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    var resultado = pelis;
    if (options.title) {
      resultado = resultado.filter((p) => {
        return p.title.includes(options.title);
      });
    }
    if (options.tag) {
      resultado = resultado.filter((p) => {
        return p.tags.includes(options.tag);
      });
    }
    if (options.title && options.tag) {
      resultado = resultado.filter((p) => {
        return p.tags.includes(options.tag) && p.title.includes(options.title);
      });
    }
    return resultado;
  }
}

export { PelisCollection, Peli };
