import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
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
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const firstPromise = this.getById(peli.id).then((p) => {
      if (p) {
        return false;
      } else {
        return this.getAll().then((p) => {
          p.push(peli);
          const secondPromise = jsonfile.writeFile(
            __dirname + "/pelis.json",
            p
          );
          return secondPromise.then(() => {
            return true;
          });
        });
      }
    });
    return firstPromise;
  }
}

export { PelisCollection, Peli };
