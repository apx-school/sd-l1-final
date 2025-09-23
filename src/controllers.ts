import { readFile, writeFile } from "fs/promises";
import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string | string[];
  };
};

class PelisController {
  private model: PelisCollection;

  constructor() {
    this.model = new PelisCollection();
  }

  async get(options?: Options): Promise<Peli[]> {
    const pelis = await this.model.getAll();

    if (!options) {
      return pelis;
    } // Devuelvo todas las pelis si no hay opciones

    let resultado = pelis.filter((p) => {
      // Buscar por "id"
      if (options.id && p.id === options.id) {
        return true;
      }

      // Buscar por "titulos"
      if (options.search && p.title.includes(options.search.title)) {
        return true;
      }

      // Buscar por "tag"
      if (options.search?.tag) {
        if (Array.isArray(options.search.tag)) {
          // Si es array → que pase si tiene al menos un tag en común
          return options.search.tag.some((tag) => p.tags.includes(tag));
        } else {
          // Si es string → búsqueda normal
          return p.tags.includes(options.search.tag);
        }
      }

      // Si no cumple ninguna condición
      return false;
    });

    return resultado;
  }

  async getOne(options: Options): Promise<Peli | undefined> {
    const resultado = await this.get(options);
    return resultado[0]; // Devuelve primer pelicula o undefined si no hay
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const all = JSON.parse(await readFile("pelis.json", "utf-8"));

      // Verifico si la nueva peli ya existe
      const existe = all.some((p) => p.id === peli.id);

      if (existe) {
        return false; // No se agrega si ya existe
      }

      all.push(peli); // Agrego la nueva peli

      await writeFile("pelis.json", JSON.stringify(all, null, 2));

      return true; // Devolver true si se agregó correctamente
    } catch (error) {
      console.error("Error al agregar la película:", error);
      return false; // Devolver false si hubo un error
    }
  }
}
export { PelisController };
