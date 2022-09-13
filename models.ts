import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile
      .readFile(__dirname + "/pelis.json")
      .then((respuesta) => {
        // la respuesta de la promesa
        return respuesta;
      });
  }
  ///Es decir, al correr npm run test los tests dan timeout.
  // [21:41]
  // Si corro comandos individualmente, tipo “ts-node index.ts get 15” me trae la peli con ID 15 y así.
  async getById(id: number): Promise<Peli> {
    return (await this.getAll()).find((item) => item.id == id);
  }

  async search(options: any): Promise<any> {
    const peli = await this.getAll();
    if (options.title && options.tags) {
      return peli.filter(
        (item) =>
          item.title.includes(options.title) && item.tags.includes(options.tags)
      );
    }
    if (options.title) {
      return peli.filter((item) => item.title.includes(options.title));
    }
    if (options.tags) {
      return peli.filter((item) => item.tags.includes(options.tags));
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        /////////////////
        return this.getAll().then((pelicula) => {
          pelicula.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", pelicula);
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
