import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  // Get all the movies
  async getAll(): Promise<Peli[]> {
    const pelis = await jsonfile.readFile("./pelis.json");
    return pelis;
  }

  // Get a movie by id
  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    const peli = pelis.find((p) => {
      return p.id == id;
    });
    return peli;
  }

  // Add a movie
  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.getAll();
    const peliExists = pelis.find((p) => {
      return p.id == peli.id;
    });
    if (peliExists) {
      return false;
    } else {
      pelis.push(peli);
      await jsonfile.writeFile("./pelis.json", pelis);
      return true;
    }
  }

  // Search a movie
  async search(options: any): Promise<any> {
    const pelis = await this.getAll();
    if (options.title && options.tag) {
      return pelis.filter((p) => {
        return p.title.includes(options.title) && p.tags.includes(options.tag);
      });
    } else if (options.title) {
      return pelis.filter((p) => {
        return p.title.includes(options.title);
      });
    } else if (options.tag) {
      return pelis.filter((p) => {
        return p.tags.includes(options.tag);
      });
    }
  }
}

export { PelisCollection, Peli };
