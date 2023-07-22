import { readFile, writeFile } from "jsonfile";
import * as _ from "lodash";

// usar loadash recomendacion
// type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  
  async getAll(): Promise<Peli[]> {
    return await readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }
  async add(peli: Peli): Promise<boolean> {
    const peliBuscadaPorId = await this.getById(peli.id);
    if (!peliBuscadaPorId) {
      const peliculas = await this.getAll();
      peliculas.push(peli);
      const estadoDeLaCarga = await writeFile("./pelis.json", peliculas).then(
        () => {
          return true;
        }
      );
      return estadoDeLaCarga;
    } else {
      return false;
    }
  }

  async getById(id: number) {
    const pelis = await this.getAll();
    const idEncontrado = _.find(pelis, ["id", id]);
    return idEncontrado;
  }

  async search(options): Promise<any> {
    const listaPelis = await this.getAll();

    if (options.tag && options.title) {
      return listaPelis.filter((peli) => {
        return (
          peli.title.includes(options.title) && peli.tags.includes(options.tag)
        );
      });
    } else if (options.title) {
      return listaPelis.filter((pelis) => {
        return pelis.title.includes(options.title);
      });
    }

    if (options.tag) {
      return listaPelis.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
    }
  }
}


export { PelisCollection, Peli };
