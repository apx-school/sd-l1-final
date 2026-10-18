
import * as jsonfile from "jsonfile";
import "./pelis.json";

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
  private archivo = "./src/pelis.json";

  // Obtener todas las películas
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.archivo);
  }

  // Buscar una película por ID
  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    return pelis.find((peli) => peli.id === id);
  }

  // Agregar una película
  async add(peli: Peli): Promise<boolean> {
    try {
      const existente = await this.getById(peli.id);

      if (existente) {
        return false;
      }

      const pelis = await this.getAll();
      pelis.push(peli);

      await jsonfile.writeFile(this.archivo, pelis, {
        spaces: 2,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  // Buscar por título y/o categoría
  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();

    return pelis.filter((peli) => {
      const coincideTitulo =
        !options.title || peli.title.includes(options.title);

      const coincideTag =
        !options.tag || peli.tags.includes(options.tag);

      return coincideTitulo && coincideTag;
    });
  }
}

export { PelisCollection, Peli };
