import * as jsonfile from "jsonfile";
import * as includes from "lodash/includes";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis: Peli[]) => {
      this.pelis = pelis;
      return pelis;
    });
  }

  async getById(id: number): Promise<Peli> {
    await this.getAll();
    const encontrado = await this.pelis.find((peli) => {
      if (peli.id == id) {
        return true;
      }
    });
    return encontrado;
  }

  async search(options: any): Promise<any> {
    await this.getAll();

    if (options.tag && options.title) {
      const enconrado = await this.pelis.filter((peli) => {
        if (
          includes(peli.tags, options.tag) &&
          includes(peli.title, options.title)
        ) {
          return true;
        }
      });
      return enconrado;
    } else if (options.title) {
      const enconrado = await this.pelis.filter((peli) => {
        if (includes(peli.title, options.title)) {
          return true;
        }
      });
      return enconrado;
    } else if (options.tag) {
      const encontrado = await this.pelis.find((peli) => {
        if (includes(peli.tags, options.tag)) {
          return true;
        }
      });
      return encontrado;
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then(() => {
          this.pelis.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", this.pelis);

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

const mock = new PelisCollection();
async function main() {
  await mock.getAll();
  console.log(await mock.search({ tag: "drama", title: "la" }));
}

main();
