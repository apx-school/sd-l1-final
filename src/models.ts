import * as jsonfile from "jsonfile";
import path from "path";

// Ruta absoluta al pelis.json dentro de src
const pathPelis = path.resolve(__dirname, "pelis.json");

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

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(pathPelis).then((data: any) => {
      return data;
    });
  }

  getById(id: number): Promise<Peli> | undefined{
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
          pelis.push(new Peli(peli.id, peli.title, peli.tags));
          return jsonfile.writeFile(pathPelis, pelis).then(() => true);
        });
      }
    });
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
      if (options.title && options.tag) {
        return (
          p.title.toLowerCase().includes(options.title.toLowerCase()) &&
          p.tags.includes(options.tag)
        );
      } else if (options.title) {
        return p.title.toLowerCase().includes(options.title.toLowerCase());
      } else if (options.tag) {
        return p.tags.includes(options.tag);
      }
      return false;
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli };
