import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json").then((peliculas) => {
      return peliculas;
    });
  }

  async getById(id: number): Promise<Peli> {
    const peliculas = await this.getAll();
    return peliculas.find((peli) => {
      return peli.id == id;
    });
  }

  async search(options: any): Promise<Peli[]> {
    let peliculas = await this.getAll();
    if (options.title) {
      peliculas = peliculas.filter((pelis) => {
        return pelis.title.includes(options.title);
      });
    }

    if (options.tag) {
      peliculas = peliculas.filter((pelis) => {
        return pelis.tags.includes(options.tag);
      });
    }

    return peliculas;
  }

  add(peli: Peli): Promise<boolean> {
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
