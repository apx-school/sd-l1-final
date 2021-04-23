import * as jsonfile from "jsonfile";
import * as concat from "lodash/concat";
import * as find from "lodash/find";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];
  promesa: Promise<any>;
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      this.peliculas = pelis;
      return this.peliculas;
    });
  }

  getById(id: number): Promise<any> {
    return this.getAll().then((p) => {
      return find(p, { id: id });
    });
  }

  search(action, objetivo): Promise<any> {
    if (action == "title") {
      return this.getAll().then(() => {
        return find(this.peliculas, { title: objetivo });
      });
    }
    if (action == "tags") {
      return this.getAll().then((pelis) => {
        return this.peliculas.forEach((p) => {
          return this.peliculas.filter(() => {
            return p.tags.includes(objetivo);
          });
        });
      });
    }
  }

  //mètodo en proceso
  add(peli: Peli): Promise<any> {
    let operacionExitosa: Promise<any>;
    let pelis = this.getAll();
    let encontrada = pelis.then(() => {
      find(pelis, peli);
    });

    if (encontrada) {
      // si fue encontrada no deveria hacer nada, solo mostrar mensaje
      return operacionExitosa.then((resolve) => {
        resolve("Pelicula existente - No se puede agregar papurri");
      });
    } else if (!encontrada) {
      //agarrar las pelis, y agregarle la peli ... despues guardar y retornar la flag
      pelis
        .then((p) => {
          concat(p, peli);
        })
        .then(() => {
          return jsonfile.writeFile("./pelis.json", this.peliculas);
        })
        .then(() => {
          return operacionExitosa.then(() => {
            console.log("pelicula agregada");
          });
        });
    }
  }
}

export { PelisCollection, Peli };
