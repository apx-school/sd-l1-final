import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((file: Promise<Peli[]>) => {
      // la respuesta de la promesa
      return file;
    });
  }

  async getById(id: number) {
    const pelis = await this.getAll();
    return pelis.find((peli) => peli.id == id);
  }

  async search(options: any): Promise<any> {
    try {
      const pelis = await this.getAll();
      if (options.title && options.tag) {
        return pelis.filter((peli) => {
          return (
            peli.title.includes(options.title) &&
            peli.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return pelis.filter((peli) => {
          return peli.title.includes(options.title);
        });
      } else if (options.tag) {
        return pelis.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  add(peli: Peli): Promise<Boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          return jsonfile.writeFile("./pelis.json", pelis).then(() => {
            return true;
          });
        });
      }
    });
  }
}

export { PelisCollection, Peli };
