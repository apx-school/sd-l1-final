import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  constructor() {
    this.getAll().then((d) => {
      this.data = d;
    });
  }
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((pelis) => {
      return (this.data = pelis);
    });
  }

  getById(id: number) {
    return this.getAll().then((collection) => {
      return collection.find((item) => {
        return item.id == id;
      });
    });
  }
  search(options: any) {
    return this.getAll().then((collection) => {
      if (options.title && options.tag) {
        return collection.filter(
          (item) =>
            item.title.includes(options.title) &&
            item.tags.includes(options.tag)
        );
      }

      if (options.title) {
        return collection.filter((item) => item.title.includes(options.title));
      }

      if (options.tag) {
        return collection.filter((item) => item.tags.includes(options.tag));
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getAll().then((coll) => {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          const data = coll;
          coll.push(peli);
          const promesaDos = jsonfile.writeFile(
            __dirname + "/pelis.json",
            data
          );
          return promesaDos.then(() => {
            return true;
          });
        }
      });
      return promesaUno;
    });
  }
}

export { PelisCollection, Peli };
