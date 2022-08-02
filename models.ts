import * as jsonfile from "jsonfile";
import { title } from "process";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json");
  }

  getById(id: number) {
    return this.getAll().then((collection) => {
      return collection.find((item) => item.id == id);
    });
  }
  search(options: any) {
    if (options.title) {
      return this.getAll().then((collection) => {
        return collection.filter((item) => {
          console.log(options);
          return item.title
            .toLowerCase()
            .includes(options.title.toString().toLowerCase());
        });
      });
    } else if (options.tag) {
      return this.getAll().then((collection) => {
        return collection.filter((item) => {
          return item.tags.includes(options.tag.toLowerCase());
        });
      });
    } else {
      return this.getAll();
    }
  }
  add(peli: Peli) {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.getAll().then((collection) => {
          collection.push(peli);
          return jsonfile.writeFile("./pelis.json", collection);
        });
        return true;
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
