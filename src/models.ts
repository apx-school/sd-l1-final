import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
const pelisFilePath = "./pelis.json";

// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class SearchOptions {
  title?: string;
  tag?: string;
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile(pelisFilePath);
  }

  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    return pelis.find((peli) => peli.id === id);
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      const pelis = await this.getAll();
      pelis.push(peli);
      await jsonfile.writeFile(pelisFilePath, pelis);
      return true;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter((peli) => {
      let matches = false;
      if (options.title) {
        matches = peli.title.toLowerCase().includes(options.title.toLowerCase());
      }
      if (options.tag) {
        matches = matches || peli.tags.includes(options.tag);
      }
      return matches;
    });
  }

}


export { PelisCollection, Peli, SearchOptions };
