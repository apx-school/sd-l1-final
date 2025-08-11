import * as jsonfile from "jsonfile";
import "C:/Users/NILTON/apx/sd-l1-final/pelis.json";

type SearchOptions = { title?: string; tag?: string };

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  //Metodo que devuelve todas las peliculas
  async getAll(): Promise<Peli[]> {
    try {
      const pelis = await jsonfile.readFile(
        "C:/Users/NILTON/apx/sd-l1-final/pelis.json"
      );
      return pelis;
    } catch (error) {
      console.error("Error al leer pelis.json:", error);
      return [];
    }
  }

  //Metodo que busca el id ingresado, devuelve la promesa con la pelicula encontrada
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    const peliculaEncontrada = pelis.find((pelicula) => pelicula.id == id);
    return peliculaEncontrada;
  }

  //Metodo que busca y devuelve peliculas por titulo y por tag
  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    const peliculasBuscadas = pelis.filter((peli) => {
      let coincide = true;

      if (options.title) {
        coincide = peli.title
          .toLowerCase()
          .includes(options.title.toLowerCase());
      }

      if (options.tag) {
        coincide =
          coincide &&
          peli.tags.some(
            (tag) => tag.toLowerCase() === options.tag.toLowerCase()
          );
      }
      return coincide;
    });
    return peliculasBuscadas;
  }

  //Metodo que ingresa a la base de datos(archivo pelis.json) la pelicula ingresada por el usuario
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      return false; // ID ya existe
    }

    try {
      const peliculas = await this.getAll();
      peliculas.push(peli);
      await jsonfile.writeFile(
        "C:/Users/NILTON/apx/sd-l1-final/pelis.json",
        peliculas,
        { spaces: 2 }
      );
      return true;
    } catch (error) {
      console.error("Error al escribir pelis.json:", error);
      return false;
    }
  }
}

export { PelisCollection, Peli };
