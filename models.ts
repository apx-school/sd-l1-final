import * as jsonfile from "jsonfile";
import * as find from "lodash/find";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((file) => {
      this.data = file;
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
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };
