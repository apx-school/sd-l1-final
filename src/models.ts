import * as jsonfile from "jsonfile";
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
      const data: Peli[] = await jsonfile.readFile("./pelis.json");
      return data;
    } catch (error) {
      console.error("Error al leer el archivo", error);
      return [];
    }
  }

  async getById(id: number): Promise<Peli | null> {
    const data: Peli[] = await this.getAll();
    const peliEncontrada = data.find((pelicula) => pelicula?.id === id);
    return peliEncontrada || null;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
      let esteVa = true;

      if (options.tag) {
        esteVa =
          esteVa &&
          p.tags
            .map((tag) => tag.toLowerCase())
            .includes(options.tag.toLowerCase());
      }
      if (options.title) {
        esteVa =
          esteVa && p.title.toLowerCase().includes(options.title.toLowerCase());
      }
      return esteVa;
    });
    return listaFiltrada;
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id);

      if (peliExistente) {
        return false;
      }
      const data: Peli[] = await this.getAll();
      data.push(peli);

      await jsonfile.writeFile("./pelis.json", data);
      return true;
    } catch (error) {
      console.error("Error al agregar la pelicula", error);
      return false;
    }
  }
}
export { PelisCollection, Peli };
