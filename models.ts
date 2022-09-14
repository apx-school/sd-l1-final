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
        // console.log("la data de la promesa:", data);
        // la respuesta de la promesa
        return respuesta;
      });
  }
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    const peliWithId = await pelis.find((item) => item.id == id);
    return peliWithId;
  }

  async search(options: any): Promise<any> {
    const pelis = await this.getAll();

    if (options.title && options.tag) {
      const peliTitleTags = await pelis.filter((item) => {
        return (
          item.title.includes(options.title) && item.tags.includes(options.tag)
        );
      });
      return peliTitleTags;
    } else if (options.title) {
      const peliWithTitle = await pelis.filter((item) => {
        return item.title.includes(options.title);
      });
      return peliWithTitle;
    } else if (options.tag) {
      const peliWithTags = await pelis.filter((item) => {
        return item.tags.includes(options.tag);
      });
      return peliWithTags;
    }
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
}

export { PelisCollection, Peli };
