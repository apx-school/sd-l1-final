import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    try {
      const pelis = await jsonfile.readFile("./src/pelis.json");
      return pelis;
    } catch (error) {
      console.error("Error al leer el JSON", error);
      return [];
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExiste = await this.getById(peli.id);
    if (peliExiste) {
      return false;
    } else {
      try {
        const pelisActuales = await this.getAll();
        pelisActuales.push(peli);
        await jsonfile.writeFile("./src/pelis.json", pelisActuales);
        return true;
      } catch (error) {
        console.error("Error al guardar la película", error);
        return false;
      }
    }
  }

  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    return pelis.find((p) => p.id === id);
  }
  

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter((p) => {
      const titleMatch = options.title ? p.title.toLowerCase().includes(options.title.toLowerCase()) : true;
      const tagMatch = options.tag ? p.tags.includes(options.tag) : true;
      return titleMatch && tagMatch;
    });
  }  
}
  
export { PelisCollection, Peli };
