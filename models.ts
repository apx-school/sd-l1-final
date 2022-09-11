import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    const pelisJson = jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis; //return [];
    });
    return pelisJson;
  }
  //Devuelve una pelicula por su Id
  async getById(id: number) {
    return await this.getAll().then((peliculas) => {
      const encontrado = peliculas.find((p) => {
        return p.id == id;
      });
      return encontrado;
    });
  }
  //busca una pelicula por su titulo o tags
  async search(options: any): Promise<any> {
    const pelis = await this.getAll();

    if (options.title && options.tag) {
      const encontrar = pelis.filter((titlePeli) => {
        return (
          titlePeli.title.includes(options.title) &&
          titlePeli.tags.includes(options.tag)
        );
      });
      return encontrar;
    } else if (options.title) {
      const encontrado = pelis.filter((titlepeli) => {
        return titlepeli.title.includes(options.title);
      });
      return encontrado;
    } else if (options.tag) {
      const tagEncontrado = pelis.find((tagPeli) => {
        return tagPeli.tags.includes(options.tag);
      });
      return tagEncontrado;
    }
  }
  //Agrega una peli al json
  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", pelis);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
}
export { PelisCollection, Peli };
