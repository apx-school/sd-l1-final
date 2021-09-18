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

  search(options: any): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      var resultado = pelis;
      if (options.title) {
        resultado = resultado.filter((p) => {
          return p.title.includes(options.title);
        });
      }
      if (options.tag) {
        resultado = resultado.filter((p) => {
          return p.tags.includes(options.tag);
        });
      }
      return resultado;
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const promesaDos = this.getAll().then((peliculas) => {
          const data = peliculas.push(peli);
          return jsonfile.writeFile("./pelis.json", data);
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
