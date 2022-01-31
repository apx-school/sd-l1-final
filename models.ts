import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peli) => {
      return peli;
    });
  }

  async getById(id: number): Promise<Peli> {
    return await this.getAll().then((pelis) => {
      return pelis.find((peli) => {
        return peli.id == id;
      });
    });
  }

  async search(options: any): Promise<Peli[]> {
    const total = await this.getAll();
    if (options.title && options.tag) {
      return total.filter((peli) => {
        return (
          peli.title.includes(options.title) && peli.tags.includes(options.tag)
        );
      });
    }
    if (options.title) {
      return total.filter((peli) => {
        if (peli.title.includes(options.title)) {
          return peli;
        }
      });
    } else if (options.tag) {
      return total.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
    }
  }

  async add(peli: Peli): Promise<boolean> {
    return await this.getAll().then((json) => {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          const data = json;
          data.push({
            id: peli.id,
            title: peli.title,
            tags: peli.tags,
          });
          const promesaDos = jsonfile.writeFile("./pelis.json", data);

          return promesaDos.then((res) => {
            return true;
          });
        }
      });
      return promesaUno;
    });
  }
}
export { PelisCollection, Peli };
