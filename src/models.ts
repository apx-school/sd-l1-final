import jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

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
      console.error(error);
      throw new Error("Error en getAll:", error);
    }
  }

  async getById(id: number): Promise<Peli | null> {
    try {
      const pelis = await this.getAll();
      const peli = pelis.find((peli: Peli) => peli.id === id);

      return peli || null;
    } catch (error) {
      throw new Error("Error en getById:", error);
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id);

      if (peliExistente) {
        return false;
      }
      const pelis = await this.getAll();
      pelis.push(peli);
      await jsonfile.writeFile("./src/pelis.json", pelis);

      return true;
    } catch (error) {
      console.error("Error en add:", error);

      return false;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    try {
      const pelis = await this.getAll();

      const pelisFiltradas = pelis.filter((peli: Peli) => {
        const coincideConTitle = options.title
          ? peli.title.toLowerCase().includes(options.title.toLowerCase())
          : true;
        const coincideConTag = options.tag
          ? peli.tags.includes(options.tag.toLowerCase())
          : true;

        return coincideConTitle && coincideConTag;
      });

      return pelisFiltradas;
    } catch (error) {
      throw new Error("Error en search:", error);
    }
  }
}

export { PelisCollection, Peli };
