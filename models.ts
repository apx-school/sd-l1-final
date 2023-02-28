import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(__dirname + "/pelis.json");
  }

  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    return pelis.find((p) => {
      return p.id == id;
    });
  }

  async search(options: any) {
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
    } else {
      return pelis;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id);
      if (peliExistente) {
        return false;
      } else {
        const pelis = await this.getAll();
        pelis.push(peli);
        await jsonfile.writeFile(__dirname + "/pelis.json", pelis);
        return true;
      }
    } catch (error) {
      throw new Error(`Error al agregar la película: ${error}`);
    }
  }
}

export { PelisCollection, Peli };
