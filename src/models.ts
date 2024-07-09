import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

interface SearchOptions {
  title?: string;
  tag?: string;
}

class Peli {
  id: number;
  title: string;
  tags: string[];

  constructor(id: number, title: string, tags: string[]) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }
}

class PelisCollection {
  private filePath: string;

  constructor(filePath: string = "./pelis.json") {
    this.filePath = filePath;
  }

  async getAll(): Promise<Peli[]> {
    try {
      const data = await jsonfile.readFile(this.filePath);
      return data;
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliculas = await this.getAll();
      if (peliculas.find((p) => p.id === peli.id)) {
        console.error("Error: ID de película duplicado.");
        return false;
      }
      peliculas.push(peli);
      await jsonfile.writeFile(this.filePath, peliculas, { spaces: 2 });
      return true;
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false;
    }
  }

  async getById(id: number): Promise<Peli | undefined> {
    try {
      const peliculas = await this.getAll();
      return peliculas.find((p) => p.id === id);
    } catch (error) {
      console.error("Error al obtener la película por ID:", error);
      return undefined;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    try {
      const peliculas = await this.getAll();
      if (options.title) {
        return peliculas.filter((p) => p.title.includes(options.title));
      } else if (options.tag) {
        return peliculas.filter((p) => p.tags.includes(options.tag));
      } else {
        console.error("Error: Opciones de búsqueda no válidas.");
        return [];
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
      return [];
    }
  }
}

export { PelisCollection, Peli, SearchOptions };


const collection = new PelisCollection("./pelis.json");