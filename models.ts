import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  listaDePelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return (this.listaDePelis = pelis);
    });
  }
  getById(id: number) {
    var promesaId = this.getAll().then(() => {
      return this.listaDePelis.find((peli) => peli.id == id);
    });
    return promesaId;
  }
  search(options: any): Promise<Peli[]> {
    var promesaSearch = this.getAll().then((peliculas) => {
      let nuevaListaDePelis = peliculas;

      if (options.title) {
        nuevaListaDePelis = nuevaListaDePelis.filter((pelicula) => {
          if (pelicula.title.includes(options.title)) {
            return true;
          }
        });
      }
      if (options.tag) {
        nuevaListaDePelis = nuevaListaDePelis.filter((pelicula) => {
          return pelicula.tags.includes(options.tag);
        });
      }

      return nuevaListaDePelis;
    });

    return promesaSearch;
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExiste) => {
      if (peliExiste) {
        return false;
      } else {
        this.listaDePelis.push(peli);
        return jsonfile
          .writeFile("./pelis.json", this.listaDePelis)
          .then(() => {
            return true;
          });
      }
    });
  }
}

export { PelisCollection, Peli };
