import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];

  getAll(): Peli[] {
    return jsonfile.readFile("./pelis.json").then((pelisJson) => {
      return (this.pelis = pelisJson);
    });
  }

  async getById(id: number): Promise<Peli> {
    const peliObtenida = await this.getAll();
    return peliObtenida.find((p) => p.id === id);
  }

  add(peli: Peli): Promise<boolean> {
    const pelisPromesa = this.getById(peli.id).then((idPeli) => {
      if (idPeli) {
        return false;
      } else {
        this.pelis.push(peli);
        const agregarPeli = jsonfile
          .writeFile("./pelis.json", this.pelis)
          .then(() => {
            return true;
          });
        return agregarPeli;
      }
    });
    return pelisPromesa;
  }

  async search(options: any): Promise<any> {
    const lista = await this.getAll();
    let esteVa = false;

    if (options.title && options.tag) {
      const filterTitleTag = lista.filter((p) => {
        if (p.title.includes(options.title) && p.tags.includes(options.tag)) {
          return (esteVa = true);
        }
      });
      return filterTitleTag;
    }

    if (options.title) {
      const titleFilter = lista.filter((p) => {
        if (p.title.includes(options.title)) {
          return (esteVa = true);
        }
      });
      return titleFilter;
    }

    if (options.tag) {
      const tagFilter = lista.filter((p) => {
        if (p.tags.includes(options.tag)) {
          return (esteVa = true);
        }
      });
      return tagFilter;
    }
  }
}

export { PelisCollection, Peli };
