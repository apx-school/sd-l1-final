import * as jsonfile from "jsonfile";

class Pelicula {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { 
  title?: string; 
  tag?: string 
};

class PelisCollection {

  // Obtiene todas las películas desde el archivo JSON.
  async getAll(): Promise<Pelicula[]> {
    try {
      const result = await jsonfile.readFile("./pelis.json");
      return result;
    } catch (error) {
      throw new Error(`Error ${error.message}`);
    }
  }

  // Agrega una nueva película si no existe una con el mismo ID.
  async add(pelicula: Pelicula): Promise<boolean> {
    try {
      // Verifica si ya existe una película con el mismo ID.
      const filmsFind: Pelicula | undefined = await this.getById(pelicula.id);
      return filmsFind ? false : await this.recordFilmInJSON(pelicula);
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

  // Graba una nueva película en el archivo JSON.
  async recordFilmInJSON(pelicula: Pelicula): Promise<boolean> {
    const films: Pelicula[] = await this.getAll();
    films.push(pelicula);
    await jsonfile.writeFile("./pelis.json", films);
    return true;
  }

  // Obtiene una película por su ID.
  async getById(id: number): Promise<Pelicula | undefined> {
    const result: Pelicula[] = await this.getAll();
    return result.find(element => element.id === id);
  }

  // Busca películas por opciones como título y etiquetas.
  async search(options?: SearchOptions): Promise<Pelicula[]> {
    const films = await this.getAll();

    return films.filter(element => {
        const titleMatch = options?.title ? element.title === options.title : false;
        const tagMatch = options?.tag ? element.tags.includes(options.tag) : false;

        return titleMatch || tagMatch;
    });
  }
}

export { PelisCollection, Pelicula };
