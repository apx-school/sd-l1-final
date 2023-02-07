import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  listaDePeliculas: Peli[];

  async getAll(): Promise<Peli[]> {
    const data = await jsonfile.readFile(__dirname + "/pelis.json");
    return (this.listaDePeliculas = data);
  }

  async getById(id: number): Promise<Peli> {
    await this.getAll();
    const peliBuscada = this.listaDePeliculas.find((peli) => peli.id == id);
    return peliBuscada;
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((nuevaPeli) => {
          nuevaPeli.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", nuevaPeli);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
  async search(options: any): Promise<Peli[]> {
    await this.getAll();

    if (options.title && options.tag) {
      return this.listaDePeliculas.filter((peli) => {
        return (
          peli.title.includes(options.title) && peli.tags.includes(options.tag)
        );
      });
    }
    if (options.title) {
      return this.listaDePeliculas.filter((peli) => {
        return peli.title.includes(options.title);
      });
    }
    if (options.tag) {
      return this.listaDePeliculas.filter((peli) => {
        return peli.tags.includes(options.tag);
      });
    }
  }
}

//type SearchOptions = { title?: string; tag?: string };

export { PelisCollection, Peli };
