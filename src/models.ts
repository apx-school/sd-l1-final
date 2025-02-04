import * as jsonfile from "jsonfile";
import * as path from "path";

const pelisFilePath = path.join(__dirname, "./pelis.json"); // Ruta correcta para acceder a pelis.json

// Cargar las películas desde el archivo pelis.json
const loadPelis = (): Peli[] => {
  try {
    return jsonfile.readFileSync(pelisFilePath); // Usamos jsonfile.readFileSync en lugar de fs.readFileSync
  } catch (error) {
    console.error("Error leyendo el archivo de películas:", error);
    return []; // Retorna un array vacío si ocurre un error
  }
}

// Clase para representar una película
class Peli {
  id: number;
  title: string;
  tags: string[];
}

// Opciones de búsqueda por título o etiqueta
class SearchOptions {
  title?: string;
  tag?: string;
}

// Colección de películas, que incluye los métodos para interactuar con el archivo
class PelisCollection {
  remove(id: number) {
    throw new Error("Method not implemented.");
  }
  // Obtener todas las películas
  async getAll(): Promise<Peli[]> {
    try {
      return await jsonfile.readFile(pelisFilePath);
    } catch (error) {
      console.error("Error leyendo el archivo de películas:", error);
      return [];
    }
  }

  // Obtener una película por su ID
  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    return pelis.find((peli) => peli.id === id);
  }

  // Agregar una nueva película
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      console.log(`Error: Ya existe una película con el ID ${peli.id}`);
      return false;
    } else {
      const pelis = await this.getAll();
      pelis.push(peli);
      try {
        await jsonfile.writeFile(pelisFilePath, pelis);
        return true;
      } catch (error) {
        console.error("Error guardando el archivo de películas:", error);
        return false;
      }
    }
  }

  // Buscar películas por título o etiqueta
  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter((peli) => {
      let matches = false;
      if (options.title) {
        matches = peli.title.toLowerCase().includes(options.title.toLowerCase());
      }
      if (options.tag) {
        matches = matches || peli.tags.includes(options.tag);
      }
      return matches;
    });
  }
}

export { PelisCollection, Peli, SearchOptions, loadPelis };
