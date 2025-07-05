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

  constructor(id: number, title: string, tags: string[]) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }
}

type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  peliculas: Peli[] = [];

  async getAll(): Promise<Peli[]> {
    try {
      const resultado = await jsonfile.readFile("./src/pelis.json");
      this.peliculas = resultado;
      return this.peliculas;
    } catch (err) {
      console.log(err);
      return this.peliculas;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliculas = await this.getAll();
      const peliculaExistente = await this.getById(peli.id);
      if (peliculaExistente) return false;
      const peliAgregada = [...peliculas, peli];
      await jsonfile.writeFile("./src/pelis.json", peliAgregada);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getById(id: number): Promise<Peli> {
    const peli = this.peliculas.find((p) => p.id === id);
    if (!peli) {
      console.log("No existe película con ese id");
      return null;
    }
    return peli;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
      const tagresultado = options.tag
        ? p.tags.map((t) => t.toLowerCase()).includes(options.tag.toLowerCase())
        : true;
      const titleresultado = options.title
        ? p.title.toLowerCase().includes(options.title.toLowerCase())
        : true;

      return tagresultado && titleresultado; // Solo devuelve true si ambas condiciones son verdaderas
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli };
