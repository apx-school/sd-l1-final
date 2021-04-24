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
      return this.getAll().then((res) => {
        return find(res, { title: objetivo });
      });
    }

    if (action == "tags") {
      return this.getAll().then((pelis) => {
        return pelis.filter((p) => {
          return p.tags.includes(objetivo);
        });
      });
    }
  }

  //mètodo en proceso

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        console.log("ya existe");
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        this.peliculas.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.peliculas);

        return promesaDos.then(() => {
          console.log("peli agregada correctamente");
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
