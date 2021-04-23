import * as jsonfile from "jsonfile";
import * as find from "lodash/find";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((file) => {
      return file;
    });
  }
  getById(id: number): Promise<any> {
    return this.getAll().then((file) => {
      return find(file, { id: id });
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((file) => {
      let arrayResultado = file;
      if (options.title) {
        arrayResultado = arrayResultado.filter((pelicula) => {
          return pelicula.title.includes(options.title);
        });
      }
      if (options.tag) {
        arrayResultado = arrayResultado.filter((pelicula) => {
          return pelicula.tags.find((tag) => {
            return tag.includes(options.tag);
          });
        });
      }
      return arrayResultado;
    });
  }
  add(peli: Peli): Promise<any> {
    return this.getAll().then((file) => {
      if (!find(file, { id: peli.id }) && peli.title && peli.tags) {
        file.push(peli);
        return jsonfile
          .writeFile("./pelis.json", file)
          .then(() => {
            console.log(file);
            return true;
          })
          .catch(() => {
            console.log(peli);
            return false;
          });
      } else {
        return false;
      }
    });
  }
}

export { PelisCollection, Peli };
