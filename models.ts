import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }
  async getById(id: number): Promise<Peli> {
    let pelis = await this.getAll();
    return pelis.find((pelis: Peli) => pelis.id === id);
  }

  async search(options: any): Promise<any> {
    const pelis = await this.getAll();
    if (options.title && options.tag) {
      return pelis.filter((peli) => {
        const filtradasPorTitulo = peli.title.includes(options.title);
        const filtradasPorTag = peli.tags.includes(options.tag);
        return filtradasPorTitulo && filtradasPorTag;
      });
    } else if (options.title) {
      return pelis.filter((peli) => peli.title.includes(options.title));
    } else if (options.tag) {
      return pelis.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
    } else {
      return pelis;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const idPeliExiste = await this.getById(peli.id);
    if (idPeliExiste) {
      return false;
    }
    const pelis = await this.getAll();
    pelis.push(peli);
    await jsonfile.writeFile("./pelis.json", pelis);
    return true;
  }
}
export { PelisCollection, Peli };
