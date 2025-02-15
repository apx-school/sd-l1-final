import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta
type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      return false;
    }

    const pelis = await this.getAll();
    pelis.push(peli);

    try {
      await jsonfile.writeFile("./src/pelis.json", pelis);
      return true;
    } catch (error) {
      console.error("Error al escribir el archivo:", error);
      return false;
    }
  }
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./src/pelis.json");
  }

  async getById(id: number): Promise<Peli> {
    const peli = await this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => p.id === id);
      return resultado;
    });
    return peli;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    let peli: Peli[];

    if (options.title) {
      peli = pelis.filter((p) => p.title.includes(options.title));
      return peli;
    } else if (options.tag) {
      peli = pelis.filter((p) => {
        return p.tags.some((tag) => tag.includes(options.tag));
      });
      return peli;
    } else {
      throw new Error("Inserte un dato válido");
    }
  }
}
export { PelisCollection, Peli };
