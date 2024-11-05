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
  peliculas: Peli[];
  constructor() {}

  async getAll(): Promise<Peli[]> {
    const datos = await jsonfile.readFile("pelis.json");
    return datos;
  }

  async add(peli: Peli) {
    const peliculaExistente: boolean =
      (await this.getById(peli.id)) != undefined ? true : false;
    if (peliculaExistente) {
      return false;
    } else {
      const peliculas: Peli[] = await this.getAll();
      peliculas.push(peli);
      await jsonfile.writeFile("pelis.json", peliculas);
      return peliculas;
    }
  }

  async getById(id: number) {
    const datos = await jsonfile.readFile("pelis.json");
    const pelicula = await datos.find((p) => p.id === id);
    return pelicula;
  }

  async search(options: SearchOptions) {
    const lista = await this.getAll();
    let listaFiltrada = lista;

    if (options.tag) {
      listaFiltrada = listaFiltrada.filter((p) =>
        p.tags.includes(options.tag.toLowerCase())
      );
    }
    if (options.title) {
      listaFiltrada = listaFiltrada.filter((p) =>
        p.title.toLowerCase().includes(options.title.toLowerCase())
      );
    }
    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
