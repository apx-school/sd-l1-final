import * as jsonfile from "jsonfile";

// El siguiente import no se usa pero es necesario
import "./pelis.json";

// no modificar estas propiedades
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
  // Devuelve todas las películas
  async getAll(): Promise<Peli[]> {
    const pelis = await jsonfile.readFile(__dirname + "/pelis.json");
    return pelis as Peli[];
  }

  // Busca una película por ID
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();

    return pelis.find((p) => p.id == id);
  }

  // Busca películas por título y/o tag
  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();

    const pelisFiltradas = pelis.filter((p) => {
      let esteVa = true;

      if (options.title) {
        esteVa =
          esteVa &&
          p.title.toLowerCase().includes(options.title.toLowerCase());
      }

      if (options.tag) {
        esteVa = esteVa && p.tags.includes(options.tag);
      }

      return esteVa;
    });

    return pelisFiltradas;
  }

  // Agrega una película al archivo JSON
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      return false;
    }

    const pelis = await this.getAll();

    pelis.push(peli);

    try {
      await jsonfile.writeFile(__dirname + "/pelis.json", pelis);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export { PelisCollection, Peli };