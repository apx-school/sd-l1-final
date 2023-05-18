import * as jsonfile from "jsonfile";

type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const json = await jsonfile.readFile(__dirname + "/pelis.json");
    return json;
  }

  async add(peli: Peli): Promise<boolean> {
    const idEncontrado = await this.getById(peli.id);
    if (idEncontrado) {
      return false;
    } else {
      const pelis = await this.getAll();
      pelis.push(peli);
      const promesaDos = await jsonfile.writeFile("./pelis.json", pelis);
      return promesaDos;
    }
  }

  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    return pelis.find((i) => {
      return i.id == id;
    });
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    const listraFiltrada = lista.filter(function (i) {
      let esteVa;
      if (options.tag) {
        esteVa = i.tags.includes(options.tag);
      }
      if (options.title) {
        esteVa = i.title.includes(options.title);
      }
      if (options.tag && options.title) {
        esteVa =
          i.tags.includes(options.tag) && i.title.includes(options.title);
      }
      return esteVa;
    });
    return listraFiltrada;
  }
}

export { PelisCollection, Peli };
