import * as jsonfile from "jsonfile";
import "./pelis.json";

type SearchOptions = { title?: string; tag?: string };

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }

  async getById(id: number): Promise<Peli | null> {
    try {
      const allPelis = await jsonfile.readFile("./pelis.json");
      return allPelis.find((peli) => peli.id === id) || null;
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return null;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      const pelis = await this.getAll();
      pelis.push(peli);
      await jsonfile.writeFile("./pelis.json", pelis);
      return true;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((peli) => {
      let esteVa = false;
      if (options.tag) {
        esteVa = peli.tags.includes(options.tag);
      }
      if (options.title) {
        esteVa = peli.title.includes(options.title);
      }
      return esteVa;
    });
    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
