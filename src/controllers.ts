import { PelisCollection, Peli } from "./models"

type Options = {
  id?: number
  search?: {
    title?: string
    tag?: string
  }
}

class PelisController {
  peliculas: PelisCollection

  constructor() {
    this.peliculas = new PelisCollection()
  }

  async get(options?: Options): Promise<Peli | Peli[]> {
    if (!options) {
      // Si no se proporcionan opciones, devolver todas las películas
      return this.peliculas.getAll();
    }
  
    if (options.id) {
      // Si se proporciona el ID, buscar por ID
      const pelicula = await this.peliculas.getById(options.id);
      if (!pelicula) {
        throw new Error(`No se encontró ninguna película con el ID ${options.id}`);
      }
      return pelicula;
    } else if (options.search) {
      // Si se proporciona el objeto de búsqueda, buscar por título y/o tag
      if (options.search.title && options.search.tag) {
        // Filtrar por título y tag (asegurándonos de que sea insensible a mayúsculas y minúsculas)
        return this.peliculas.search({
          title: options.search.title,
          tag: options.search.tag,
        });
      } else if (options.search.title) {
        // Filtrar por título
        return this.peliculas.search({ title: options.search.title });
      } else if (options.search.tag) {
        // Filtrar por tag (asegurándonos de que sea insensible a mayúsculas y minúsculas)
        return this.peliculas.search({ tag: options.search.tag.toLowerCase() });
      }
    }
  }
  

  async add(peli: Peli): Promise<string> {
    const success = await this.peliculas.add(peli)
    return success ? `La película ${peli.title} ha sido añadida con éxito.` : `La película con ID ${peli.id} ya existe. No se ha añadido.`
  }
}

export { PelisController }
