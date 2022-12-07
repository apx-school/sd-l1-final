import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  collectionPelis: Peli[];

  async getAll(): Promise<Peli[]> {
    const json = await jsonfile.readFile(__dirname + "/pelis.json");

    return (this.collectionPelis = json);
  }

  async getById(id: number): Promise<Peli> {
    const peliculaBuscada = (await this.getAll()).find((p) => {
      return p.id == id;
    });

    return peliculaBuscada;
  }

  async search(options: any): Promise<any> {
    await this.getAll();

    if (options.title) {
      return this.collectionPelis.filter((peli) => {
        return peli.title.includes(options.title);
      });
    }
    if (options.title && options.tag) {
      return this.collectionPelis.filter((peli) => {
        return (
          peli.title.includes(options.title) && peli.tags.includes(options.tag)
        );
      });
    }
    if (options.tag) {
      return this.collectionPelis.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((json) => {
          json.push(peli);
          const promesaDos = jsonfile.writeFile(
            __dirname + "/pelis.json",
            json
          );
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
