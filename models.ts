import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];

  async getAll(): Promise<Peli[]> {
    const json = await jsonfile.readFile("./pelis.json");
    // la respuesta de la promesa
    //return [];
    return (this.peliculas = json);
  }

  async getById(id: number): Promise<Peli> {
    await this.getAll();
    const peliconId = this.peliculas.find((pel) => pel.id == id);
    return peliconId;
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((peliculas) => {
          peliculas.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }

  //async search(options: any): Promise<Peli[]> {}

  async search(options: any): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((pel) => {
          return (
            pel.title.includes(options.title) && pel.tags.includes(options.tag)
          );
        });
      }

      if (options.title) {
        return pelis.filter((pel) => {
          return pel.title.includes(options.title);
        });
      }

      if (options.tag) {
        return pelis.filter((pel) => {
          return pel.tags.includes(options.tag);
        });
      }
    });
  }
}

export { PelisCollection, Peli };
