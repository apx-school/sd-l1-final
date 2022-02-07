import * as jsonfile from "jsonfile";
import { pull } from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const misPeliculas = await jsonfile.readFile("./pelis.json");
    return misPeliculas;
  }
  async getById(id: number): Promise<Peli> {
    let misPelis = await this.getAll();
    const peliEncontrada = misPelis.find((peliculas) => {
      return peliculas.id == id;
    });
    return peliEncontrada;
  }

  async search(options: any): Promise<Peli[]> {
    const misPelis = await this.getAll();
    if (options.title && !options.tag) {
      const filtroByTitle = misPelis.filter((peliculas) => {
        return peliculas.title.includes(options.title);
      });
      return filtroByTitle;
    } else if (options.tag && !options.title) {
      const filtroByTag = misPelis.filter((peliculas) => {
        return peliculas.tags.includes(options.tag);
      });
      return filtroByTag;
    } else if (options.tag && options.title) {
      const filtroByTagAndTitles = misPelis.filter((peliculas) => {
        return (
          peliculas.tags.includes(options.tag) &&
          peliculas.title.includes(options.title)
        );
      });
      return filtroByTagAndTitles;
    }
  }
  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then(async (peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const misPelis = await this.getAll();
        misPelis.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", misPelis);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
