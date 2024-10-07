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

export type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data) => {
      return data;
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((p) => {
      return p.find((pelicula) => pelicula.id === id);
    });
  }

  async add(peli: Peli): Promise<boolean> {
    const peliculas = await this.getAll();

    const promesa1 = this.getById(peli.id).then((p) => {
      if (p) {
        console.log("Error, ya existe una pelicula con ese id");
        return false;
      } else {
        peliculas.push(peli);
        return jsonfile.writeFile("./pelis.json", peliculas).then(() => {
          console.log("La pelicula se agregó correctamente");
          return true;
        });
      }
    });
    return promesa1;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
      let esteVa = true;

      if (options.tag) {
        esteVa = esteVa && p.tags.includes(options.tag);
      }

      if (options.title) {
        esteVa = esteVa && p.title.includes(options.title);
      }

      return esteVa;
    });

    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
