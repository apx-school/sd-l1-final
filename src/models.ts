import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  private filePath = "./pelis.json";

  async getAll(): Promise<Peli[]> {
    try {
      return await jsonfile.readFile(this.filePath);
    } catch (error) {
      console.error("Error al leer el archivo JSON:", error);
      return [];
    }
  }

  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    return pelis.find((peli) => peli.id === id) || null;
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false; // Ya existe una película con ese ID
    }

    const pelis = await this.getAll();
    pelis.push(peli);

    try {
      await jsonfile.writeFile(this.filePath, pelis, { spaces: 2 });
      return true;
    } catch (error) {
      console.error("Error al escribir el archivo JSON:", error);
      return false;
    }
  }
  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const lista = await this.getAll();

    return lista.filter((p) => {
      let esteVa = false;
      if (options.tag && p.tags.includes(options.tag)) {
        esteVa = true;
      }
      if (options.title && p.title.toLowerCase().includes(options.title.toLowerCase())) {
        esteVa = true;
      }
      return esteVa;
    });
  }
}

export { PelisCollection, Peli };
