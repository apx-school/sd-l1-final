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

interface SearchOptions {
  title?: string;
  tag?: string;
}

class PelisCollection {
  // MI PRIMER METODO:
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      return peliculas;
      return [];
    });
  }
  // MI SEGUNDO METODO:
  getById(id: number): Promise<Peli | void> {
    return this.getAll().then((peliculas) => {
      const resultado = peliculas.find((peli) => {
        return peli.id == id;
      });
      return resultado;
    });
  }
  // MI TERCER METODO:
  add(peli: Peli): Promise<boolean> {
    return this.getAll().then((peliculas) => {
      const existe = peliculas.find((p) => p.id === peli.id);
      if (existe) {
        return false;
      }
      peliculas.push(peli); // agregar la nueva peli al arreglo
      return jsonfile.writeFile("./pelis.json", peliculas).then(() => {
        return true;
      });
    });
  }
  // MI CUARTO METODO:
  search(options: SearchOptions): Promise<Peli[]> {
    return this.getAll().then((peliculas) => {
      if (!options.title && !options.tag) {
        return []; // si no hay ni title ni tag, devuelve array vacío
      }
      return peliculas.filter((peli) => {
        let cumple = false;
        if (options.title) {
          // buscar si el title está en el título de la peli, case insensitive
          if (peli.title.toLowerCase().includes(options.title.toLowerCase())) {
            cumple = true;
          }
        }
        if (options.tag) {
          // buscar si el tag está en el array de tags
          if (peli.tags.includes(options.tag)) {
            cumple = true;
          }
        }

        return cumple;
      });
    });
  }
}

export { PelisCollection, Peli };
