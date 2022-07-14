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
  async getById(id: number) {
    const peli = await this.getAll();
    return peli.find((e) => {
      return e.id == id;
    });
  }
  async search(options: any) {
    var peli = await this.getAll();
    if (options.title && options.tag) {
      let respuesta = peli.filter((e) => {
        e.title.includes(options.title) && e.tags.includes(options.tag);
      });
      return respuesta;
    } else if (options.title) {
      let respuesta = peli.filter((e) => {
        return e.title.includes(options.title);
      });
      return respuesta;
    } else if (options.tag) {
      let respuesta = peli.filter((e) => {
        e.tags.includes(options.tag);
      });
      return respuesta;
    }
  }
}
export { PelisCollection, Peli };
