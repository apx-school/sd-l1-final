import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: any; tag?: string };

//en algun momento quitar el load()

class PelisCollection {
  allPelis: Peli[] = [];

  async load() {
    return (this.allPelis = await this.getAll());
  }
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(__dirname + "/pelis.json");
  }
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    return pelis.find((p) => {
      return p.id == id;
    });
  }
  async add(peli: Peli): Promise<boolean> {
    if (await this.getById(peli.id)) {
      return false;
    } else {
      await this.load();

      this.allPelis.push(peli);
      await jsonfile.writeFile(__dirname + "/pelis.json", this.allPelis);

      return true;
    }
  }
  async search(options: SearchOptions) {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
      let esteVa = false;
      if (options.tag) {
        esteVa = p.tags.includes(options.tag);
      } else if (options.title) {
        esteVa = p.title.toString().includes(options.title);
      }
      return esteVa;
    });
    if (options.tag && options.title) {
      //solo filtro por titulo T-T D:
      return listaFiltrada.filter((p) => {
        return p.title.includes(options.title);
      });
    }

    return listaFiltrada;
  }
}
export { Peli, PelisCollection };
