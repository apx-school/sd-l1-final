import * as jsonfile from "jsonfile";
import { title } from "process";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
    // la respuesta de la promesa
  }

  async getById(id: number): Promise<Peli> {
    const c = await this.getAll();
    return c.find((peli) => {
      return peli.id == id;
    });
  }
  async search(options: any): Promise<Peli[]> {
    const peliculas = await this.getAll();
    if (options.title && options.tag) {
      return peliculas.filter((pelis) => {
        return (
          pelis.title.includes(options.title) &&
          pelis.tags.includes(options.tag)
        );
      });
    }
    if (options.title) {
      return peliculas.filter((pelis) => {
        return pelis.title.includes(options.title);
      });
    }
    if (options.tag) {
      return peliculas.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id);
    if (promesaUno) {
      return false;
    } else {
      const datos = await this.getAll();
      datos.push(peli);

      await jsonfile.writeFile("./pelis.json", datos);
      return true;
    }
  }
}

export { PelisCollection, Peli };
