import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      return peliculas;
    });
  }
  getById(id: number) {
    return this.getAll().then((peliculas) => {
      const resultado = peliculas.find((peli) => {
        return peli.id == id;
      });
      return resultado;
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((peliculas) => {
      return peliculas.filter((pelicula) => {
        if (options.title && options.tag) {
          return (
            pelicula.title.includes(options.title) &&
            pelicula.tags.includes(options.tag)
          );
        } else if (options.title) {
          return pelicula.title.includes(options.title);
        } else if (options.tag) {
          return pelicula.tags.includes(options.tag);
        }
      });
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const data = this.getAll();
        const promesaDos = data.then((p) => {
          p.push(peli);
          return jsonfile.writeFile("./pelis.json", p);
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
