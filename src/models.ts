type SearchOptions = { 
  title?: string; 
  tag?: string; 
};

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

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }

  async getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => p.id === id);
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return jsonfile.readFile("./pelis.json").then((pelis) => {
          const data = [...pelis, peli];
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos.then(() => {
            return true;
          }).catch(() => {
            return false;
          });
        }).catch(() => {
          return false;
        });
      }
    });
    return promesaUno;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((peli) => {
      let coincide = true;

      if (options.title) {
        coincide = coincide && peli.title.toLowerCase().includes(options.title.toLowerCase());
      }

      if (options.tag) {
        coincide = coincide && peli.tags.includes(options.tag);
      }

      return coincide;
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli };
