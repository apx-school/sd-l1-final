import * as path from "path";
import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const filePath = path.join(__dirname, "pelis.json");
    return jsonfile.readFile(filePath).then((pelis) => {
      return pelis;
    });
  }

  async getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => p.id === id);
    });
  }

  add(peli: Peli): Promise<boolean> {
    const filePath = path.join(__dirname, "pelis.json");
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return jsonfile.readFile(filePath).then((pelis) => {
          const data = [...pelis, peli];
          const promesaDos = jsonfile.writeFile(filePath, data);
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
        coincide =
          coincide &&
          peli.tags.some(
            (t) => t.toLowerCase().includes (options.tag.trim().toLowerCase())
          );
      }

      return coincide;
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli, SearchOptions };
