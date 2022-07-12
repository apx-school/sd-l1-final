import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json")
  }
  async getById(id: number) {
    const peliById = await this.getAll();
      return peliById.find((p) => {
        return p.id == id;
      });
    
  }
  async search(options: any) {
    const todasLasPelis = await this.getAll();
    if (options.title && options.tag) {
      const respuesta = todasLasPelis.filter((pelis) => {
        return (
          pelis.title.includes(options.title) &&
          pelis.tags.includes(options.tag)
        );
      });
      return respuesta;
    } else if (options.title) {
      const respuesta = todasLasPelis.filter((pelis) => {
        return pelis.title.includes(options.title);
      });
      return respuesta;
    } else if (options.tag) {
      const respuesta = todasLasPelis.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
      return respuesta;
    }
  }
  async add(peli: Peli) {
    if (await this.getById(peli.id)) {
      return false;
    } else {
      const peliculas = await this.getAll();
      peliculas.push(peli);
      await jsonfile.writeFile("./pelis.json", peliculas);
      return true;
    }
  }
}

export { PelisCollection, Peli };





  