import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((x) => {
      return x;
    });
  }

  getById(id: number) {
    return this.getAll().then((peliculas) => {
      const byId = peliculas.find((x) => x.id == id);
      return byId;
    });
  }

  search(options: any) {
    if (options.title && options.tag) {
      return this.getAll().then((peliculas) => {
        const byBoth = peliculas.filter((x) =>
           x.title.includes(options.title) && x.tags.includes(options.tag)
        );
        return byBoth;
      });
    } else if (options.title) {
      return this.getAll().then((peliculas) => {
        const byTitle = peliculas.filter((x) =>
          x.title.includes(options.title)
        );
        return byTitle;
      });
    } else if (options.tag) {
      return this.getAll().then((peliculas) => {
        const filterByTag = peliculas.filter((x) =>
          x.tags.includes(options.tag)
        );
        return filterByTag;
        //Revisar si en includes() va options o tag o ambas
      });
    }
  }

  add(peli: Peli) {
    const promesaUno = this.getById(peli.id).then((idAlreadyTaken) => {
      if (idAlreadyTaken) {
        return false;
      } else {
        return this.getAll().then((allMovies) => {
          allMovies.push(peli);
          return jsonfile.writeFile("./pelis.json", allMovies).then(() => {});
        });
      }
    });
    return promesaUno;
    // No conozco la manera de agregar como "push" un dato a un archivo.json.
    // Por lo que se extraen TODOS los datos (con getAll())
    // y se le agrega una peli con el metodo push, y se devuelve todo al json
  }
}
export { PelisCollection, Peli };
