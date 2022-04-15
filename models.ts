import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.peliculas = json;
      return json;
    });
  }
  getById(id: number) {
    return this.getAll().then((json) => {
      return json.find((item) => item.id == id);
    });
  }
  search(options: any) {
    return this.getAll().then((json) => {
      let peliculas = json;

      if (options.title) {
        peliculas = peliculas.filter((pelicula) => {
          return pelicula.title.includes(options.title);
        });
      }
      if (options.tag) {
        peliculas = peliculas.filter((pelicula) => {
          return pelicula.tags.includes(options.tag);
        });
      }
      return peliculas;
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.peliculas.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.peliculas);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };
