import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any[]> {
    return jsonfile.readFile("./pelis.json").then((arrayDePelis) => {
      return arrayDePelis;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelis) => {
      const finded = pelis.find((peli) => {
        return peli.id == id;
      });
      return finded;
    });
  }
  search(options: any) {
    if (options.title && options.tag) {
      return this.getAll().then((pelis) => {
        const finded = pelis.filter((pelis) => {
          return pelis.title.includes(options.title);
        });
        const resultado = finded.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
        return resultado;
      });
    } else if (options.title) {
      return this.getAll().then((pelis) => {
        const finded = pelis.filter((pelis) => {
          return pelis.title.includes(options.title);
        });
        return finded;
      });
    } else if (options.tag) {
      return this.getAll().then((pelis) => {
        const finded = pelis.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
        return finded;
      });
    }
  }
  add(peli: Peli) {
    return this.getAll().then(() => {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          const database = this.getAll();
          const concat = database.then((data) => data.concat([peli]));
          concat.then((data) => {
            const promesaDos = jsonfile.writeFile("./pelis.json", data);
            return promesaDos.then(() => {
              return true;
            });
          });
          return true;
        }
      });
      return promesaUno;
    });
  }
}

export { PelisCollection, Peli };
