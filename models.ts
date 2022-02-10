import * as jsonfile from "jsonfile";
import { pull } from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  //Devuelve el array de peliculas completo
  async getAll(): Promise<Peli[]> {
    const misPeliculas = await jsonfile.readFile("./pelis.json");
    return misPeliculas;
  }
  //Busca una pelicula segun su id y la devuelve
  async getById(id: number): Promise<Peli> {
    let misPelis = await this.getAll();
    const peliEncontrada = misPelis.find((peliculas) => {
      return peliculas.id == id;
    });
    return peliEncontrada;
  }
  // search recibe un objeto del tipo {title: value, tag:value}
  // filtra por las peliculas por titulo, tags o las 2 al mismo tiempo
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
  //recibe una pelicula, y si esta ya pertenece al json, devuelve false
  // caso contrario, la agrega al array de pelis y se sobrescribe el json
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
