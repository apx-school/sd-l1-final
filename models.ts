import * as jsonfile from "jsonfile";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile("./pelis.json")
      .then((obj) => {
        return obj;
      })
      .catch((error) => {
        console.error;
      });
  }
  async getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => {
        return p.id == id;
      });
    });
  }
  async search(options: any): Promise<Peli[]> {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((p) => {
          return (
            p.title.includes(options.title) && p.tags.includes(options.tag)
          );
        });
      }
      if (options.title) {
        return peliculas.filter((p) => {
          return p.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((p) => {
          return p.tags.includes(options.tag);
        });
      }
    });
  }
  async add(peli: Peli): Promise<boolean> {
    return await this.getAll().then((json) => {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          const data = json;
          json.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          promesaDos.then(() => {
            return true;
          });
        }
      });
      return promesaUno;
    });
  }
}
export { PelisCollection, Peli };
