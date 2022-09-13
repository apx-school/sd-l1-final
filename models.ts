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

  async getById(id: number) {
    return (await this.getAll()).find((item) => item.id == id);
  }

  async search(options: any) {
    if (options.title) {
      return (await this.getAll()).filter((item) =>
        item.title.includes(options.title)
      );
    }
    if (options.tags) {
      return (await this.getAll()).filter((item) =>
        item.tags.includes(options.tags)
      );
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
