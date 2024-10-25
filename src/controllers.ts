import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  private movies: PelisCollection;

  constructor() {
    this.movies = new PelisCollection();
  }

  async get(options?: Options): Promise<any> {
    // Si se proporciona un ID, busca la película por ID
    try {
      if (options?.id) {
        const peli = await this.movies.getById(options.id);
        if (!peli) {
          throw new Error(`Película con ID ${options.id} no encontrada.`);
        }
        return peli; // Devuelve la película encontrada
      }

      // Si se proporciona un objeto de búsqueda
      if (options?.search) {
        const { title, tag } = options.search;
        const allMovies = await this.movies.getAll(); // Obtiene todas las películas

        // Filtra las películas según los criterios de búsqueda
        let peliculasFiltradas: Peli[] = allMovies;

        // Filtra por título si se proporciona
        if (title) {
          peliculasFiltradas = peliculasFiltradas.filter((peli) =>
            peli.title.toLowerCase().includes(title.toLowerCase())
          );
        }

        // Filtra por tag si se proporciona
        if (tag) {
          peliculasFiltradas = peliculasFiltradas.filter((peli) =>
            peli.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
          );
        }
        return peliculasFiltradas;
      }
      return await this.movies.getAll();
    } catch (error) {
      console.error("Error al obtener las peliculas", error);
      throw new Error("No se pudo obtener la lista de peliculas");
    }

    // Si no se proporciona ID ni criterios de búsqueda, devuelve todas las películas
    return this.movies.getAll();
  }

  async add(peli: Peli): Promise<Peli> {
    const success = await this.movies.add(peli);

    if (success) {
      return peli;
    } else {
      throw new Error(
        "No se pudo agregar la pelicula. Id duplicado o incorrecto"
      );
    }
  }
}

export { PelisController };
