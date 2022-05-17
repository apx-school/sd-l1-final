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
  async getById(id: number): Promise<any> {
    const resp = await this.getAll();
    return resp.find((p: Peli) => p.id == id);
  }
  async search(options: any): Promise<any> {
    var resp = await this.getAll();
    if (options.title) {
      var result = resp.filter((p) => {
        return p.title.includes(options.title);
      });
      resp = result;
    }
    if (options.tag) {
      var result = resp.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
      resp = result;
    }
    return resp;
  }
  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id);
    if (promesaUno) {
      return false;
    } else {
      // magia que agrega la pelicula a un objeto data
      const data = await this.getAll();
      data.push(peli);
      await jsonfile.writeFile("./pelis.json", data);
      return true;
    }
  }
}
export { PelisCollection, Peli };
