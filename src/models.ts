import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile("./pelis.json")
      .then((pelis) => pelis)
      .catch(() => []);  // si aún no hay archivo, devolvemos []
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      return pelis.find((peli) => peli.id === id);
    });
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter((peli) => {
      let coincide = true;

      if (options.title) {
        coincide = coincide && peli.title.includes(options.title);
      }

      if (options.tag) {
        coincide = coincide && peli.tags.includes(options.tag);
      }

      return coincide;
    });
  }

  async add(peli: Peli): Promise<boolean> {
    const existe = await this.getById(peli.id);
    if (existe) return false;
    const pelis = await this.getAll();
    pelis.push(peli);
    await jsonfile.writeFile("./pelis.json", pelis);
    return true;
  }
}

export { PelisCollection, Peli };
