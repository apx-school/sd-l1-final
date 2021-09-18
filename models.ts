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

  getById(id: number) {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => {
        return p.id == id;
      });
      return resultado;
    });
  }

  search(options: any) {
    if (options.title) {
      return this.getAll().then((pelis) => {
        const resultado = pelis.filter((pelis) => {
          return pelis.title;
        });
        return resultado;
      });
    }
    if (options.tag) {
      return this.getAll().then((pelis) => {
        const resultado = pelis.filter((pelis) => {
          return pelis.tags;
        });
        return resultado;
      });
    }
  }

  add(peli: Peli): Promise<boolean> {
    return this.getAll().then((p) => {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          const dataBase = this.getAll();
          const concat = dataBase.then((data) => {
            data.concat([peli]);
          });
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
