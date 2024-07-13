import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json");
  }
  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.getAll();
    const repetido = pelis.find((p) => {
      return p.id == peli.id;
    });
    if (repetido === undefined) {
      pelis.push(peli);
      await jsonfile.writeFile(__dirname + "/pelis.json", pelis);
      return true;
    } else {
      return false;
    }
  }
  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    const resultado = pelis.find((p) => p.id === id);
    return resultado || null;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    let resultados = pelis;

    if (options.title) {
      resultados = resultados.filter((p) => p.title.includes(options.title));
    }
    if (options.tag) {
      resultados = resultados.filter((p) => p.tags.includes(options.tag));
    }
    if (options.tag && options.title) {
      resultados = resultados.filter(
        (p) => p.tags.includes(options.tag) && p.title.includes(options.title)
      );
    }
    return resultados;
  }
}

export { PelisCollection, Peli };
