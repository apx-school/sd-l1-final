import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }

  async getById(id: number): Promise<Peli> {
    return await this.getAll().then((pelis) => {
      return pelis.find((peli) => {
        return peli.id == id;
      });
    });
  }

  async search(options: any): Promise<any> {
    const pelis = await this.getAll();

    if (options.title && options.tag) {
      return pelis.filter((peli) => {
        return (
          peli.title.includes(options.title) && peli.tags.includes(options.tag)
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
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
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
