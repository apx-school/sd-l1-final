import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id);
      if (peliExistente) {
        return false; // id duplicado
      }

      const lista = await this.getAll();
      lista.push(peli);
      await jsonfile.writeFile("./pelis.json", lista);
      return true;
    } catch (error) {
      // si hay error de escritura o lectura devolvemos false
      return false;
    }
  }

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json") as Promise<Peli[]>;
  }

  async getById(id: number): Promise<Peli | null> {
    const lista = await this.getAll();
    const found = lista.find((p) => p.id === id);
    return found || null;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    return lista.filter((peli) => {
      let cumple = true;

      if (options.title) {
        cumple =
          cumple &&
          peli.title.toLowerCase().includes(options.title.toLowerCase());
      }

      if (options.tag) {
        cumple = cumple && peli.tags.includes(options.tag);
      }

      return cumple;
    });
  }
}

export { PelisCollection, Peli, SearchOptions };