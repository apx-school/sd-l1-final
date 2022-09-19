import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const aDevolver = await jsonfile.readFile("./pelis.json");
    return aDevolver;
  }
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    const aDevolver = pelis.find((peli) => peli.id == id);
    return aDevolver;
  }
  async search(options: any): Promise<Peli[]> {
    const pelis = await this.getAll();
    if (options.title && options.tag) {
      return pelis.filter(
        (peli) =>
          peli.title.includes(options.title) && peli.tags.includes(options.tag)
      );
    } else if (options.title) {
      return pelis.filter((peli) => peli.title.includes(options.title));
    } else if (options.tag) {
      return pelis.filter((peli) => peli.tags.includes(options.tag));
    }
  }
  async add(peli: Peli): Promise<boolean> {
    const existe = await this.getById(peli.id);
    if (existe) {
      return false;
    } else {
      const pelis = await this.getAll();
      pelis.push(peli);
      await jsonfile.writeFile("./pelis.json", pelis);
      return true;
    }
  }
}
export { PelisCollection, Peli };
