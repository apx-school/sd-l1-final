import jsonfile from "jsonfile";

// El siguiente import no se usa pero es necesario
import "./pelis.json"; // Esto le dice a TypeScript que debe incluir el archivo .json

// Definimos la clase Peli para manejar las películas
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
  // Obtener todas las películas
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./src/pelis.json");
  }

  // Obtener una película por su id
  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    return pelis.find((p) => p.id === id);
  }

  // Agregar una nueva película
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false; // La peli ya existe
    }

    const allPelis = await this.getAll();
    allPelis.push(peli); // Agregar la nueva peli
    try {
      await jsonfile.writeFile("./src/pelis.json", allPelis);
      return true; // Se agregó correctamente
    } catch (error) {
      console.error("Error al escribir el archivo:", error);
      return false; // Hubo un error al escribir el archivo
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();

    return pelis.filter((p) => {
      let match = true;

      if (options.title) {
        match =
          match && p.title.toLowerCase().includes(options.title.toLowerCase());
      }

      if (options.tag) {
        match = match && p.tags.includes(options.tag);
      }

      return match;
    });
  }
}

export { PelisCollection, Peli };
