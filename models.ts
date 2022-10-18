import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(__dirname + "/pelis.json").then((respuesta) => {
        
        return respuesta;
      });
  }
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    const peliConId = pelis.find((i) => i.id == id);
    return peliConId;
  }

  async search(options: any): Promise<any> {
    const pelis = await this.getAll();

    if (options.title && options.tag) {
      const peliTitleTags = pelis.filter((item) => {
        return (
          item.title.includes(options.title) && item.tags.includes(options.tag)
        );
      });

      return peliTitleTags;
    } else if (options.title) {
      const peliConTitle = pelis.filter((item) => {
        return item.title.includes(options.title);
      });
      return peliConTitle;
    } else if (options.tag) {
      const peliConTags = pelis.filter((item) => {
        return item.tags.includes(options.tag);
      });
      return peliConTags;
    }
  }
  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        
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