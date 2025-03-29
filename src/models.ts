import * as jsonfile from "jsonfile";

// Este import (teóricamente "inútil") fuerza a incluir pelis.json en /dist
import "./pelis.json";

// Estructura base (podés agregar más campos si querés)
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  // 1. Trae todas las pelis
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis: Peli[]) => {
      return pelis;
    });
  }

  // 2. Trae una peli por id
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    return pelis.find((p) => p.id === id);
  }

  // 3. Agrega una peli
  add(peli: Peli): Promise<boolean> {
    // Primero busco si existe una peli con el mismo id
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        // Si ya existe, devuelvo false
        return false;
      } else {
        // Si no existe, leo todas las pelis, agrego la nueva y re-escribo el archivo
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis).then(() => {
            return true;
          });
        });
      }
    });
  }

  // 4. Busca pelis por title y/o tag
  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();

    let pelisFiltradas = pelis;

    // si viene title en options
    if (options.title) {
      pelisFiltradas = pelisFiltradas.filter((p) =>
        p.title.toLowerCase().includes(options.title.toLowerCase())
      );
    }

    // si viene tag en options
    if (options.tag) {
      pelisFiltradas = pelisFiltradas.filter((p) => p.tags.includes(options.tag));
    }

    return pelisFiltradas;
  }
}

export { PelisCollection, Peli, SearchOptions };
