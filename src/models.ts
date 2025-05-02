import * as jsonfile from "jsonfile";
import "../pelis.json";

class Peli {
  id: number;

  title: string;

  tags: string[];

  constructor(id: number, title: string, tags?: string[]) {
    if (id <= 0) {
      throw new Error("El ID debe ser un número positivo.");
    }

    if (!title) {
      throw new Error("Just name your movie you duck");
    }

    this.id = id;

    this.title = title;

    this.tags = tags;
  }
}

export type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const peliculas = await jsonfile.readFile(__dirname + "/../pelis.json");
    return peliculas;
  }
  async getById(id: number): Promise<Peli> | null {
    const peliculas = await this.getAll();
    const peliculaBuscada = peliculas.find((peli) => peli.id === id);
    return peliculaBuscada || null;
  }
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      console.error(
        `No se puede agregar la película. El ID ${peli.id} ya existe.`
      );
      return false;
    }
    const peliculas = await this.getAll();
    peliculas.push(peli);

    try {
      await jsonfile.writeFile("./pelis.json", peliculas);
      return true;
    } catch (error) {
      console.error("Error al escribir en el archivo:", error);
      throw new Error("No se pudo agregar la película.");
    }
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    const peliculas = await this.getAll();

    const peliculasFiltradas = peliculas.filter((p) => {
      let coincide = true;
      if (options.title) {
        coincide =
          coincide &&
          p.title.toLowerCase().includes(options.title.toLowerCase());
      }

      if (options.tag) {
        coincide = coincide && p.tags.includes(options.tag.toLowerCase());
      }

      return coincide;
    });
    return peliculasFiltradas;
  }
}

export { PelisCollection, Peli };
