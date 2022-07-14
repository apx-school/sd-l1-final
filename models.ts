import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }

  async getById(id: number) {
    const pelis = await this.getAll();
    return pelis.find((e) => {
      return e.id == id;
    });
  }
  async search(options: any) {
    const pelis = await this.getAll();
    if (options.title && options.tag) {
      return pelis.filter(
        (e) => e.title.includes(options.title) && e.tags.includes(options.tag)
      );
    } else if (options.title) {
      return pelis.filter((e) => e.title.includes(options.title));
    } else if (options.tag) {
      return pelis.filter((e) => e.tags.includes(options.tag));
    }
  }
  async add(peli: Peli): Promise<boolean> {
    const exite = await this.getById(peli.id);
    if (exite) {
      return false;
    } else {
      const data = await this.getAll();
      data.push(peli);
      await jsonfile.writeFile("./pelis.json", data);
      return true;
    }
  }
}
export { PelisCollection, Peli };
