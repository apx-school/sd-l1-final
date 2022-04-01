import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return (this.peliculas = pelis);
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((peliculas) => {
      return peliculas.find((p) => p.id == id);
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((peliculas) => {
      return peliculas.filter((p) => {
        if (options.title && options.tag) {
          return (
            p.title.includes(options.title) && p.tags.includes(options.tag)
          );
        } else if (options.title) {
          return p.title.includes(options.title);
        } else if (options.tag) {
          return p.tags.includes(options.tag);
        }
      });
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExiste) => {
      if (peliExiste) {
        return false;
      } else {
        this.peliculas.push(peli);
        const data = this.peliculas;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
