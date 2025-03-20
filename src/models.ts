import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json");
  }
  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    return pelis.find((p) => p.id == id) || null;
  }

  async add(peli: Peli): Promise<boolean> {
    //console.log("Película a agregar:", peli);

    const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      return false;
    }

    try {
      const peliculas = await this.getAll();
      peliculas.push(peli);
      await jsonfile.writeFile("./pelis.json", peliculas);
      return true; // Éxito al agregar la película.
    } catch (error) {
      console.error("Error al escribir en el archivo:", error);
      return false; // Si hay un error de escritura, retorna false.
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter((p) => {
      const byTitle = !options.title || p.title.includes(options.title);
      const byTag = !options.tag || p.tags.includes(options.tag);
      return byTitle && byTag;
    });
  }
}
export { PelisCollection, Peli };
