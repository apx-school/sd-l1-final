import * as jsonfile from "jsonfile";

import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data) => {
      return data;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      return pelis.find((peli) => peli.id === id);
    });
  }
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis).then(() => {
            return true;
          });
        });
      }
    });
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    if (!options.tag && !options.title) {
      return lista;
    }

    const listaFiltrada = lista.filter((p) => {
      let esteVa = false;

      if (options.tag) {
        esteVa = esteVa || p.tags.includes(options.tag);
      }

      if (options.title) {
        esteVa =
          esteVa || p.title.toLowerCase().includes(options.title.toLowerCase());
      }

      return esteVa;
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli };
