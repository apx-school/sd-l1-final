import * as jsonfile from "jsonfile";

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
      return peliculas.find((i) => {
        return i.id == id;
      });
    });
  }
  search(options: any) {
    return this.getAll().then((lasPelis) => {
      if (options.title && options.tag) {
        return lasPelis.filter((i) => {
          return (
            i.title.includes(options.title) && i.tags.includes(options.tag)
          );
        });
      }
      if (options.title) {
        return lasPelis.filter((i) => i.title.includes(options.title));
      }
      if (options.tag) {
        return lasPelis.filter((i) => i.tags.includes(options.tag));
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((idRepetido) => {
      if (idRepetido) {
        return false;
      } else {
        return this.getAll().then((lista) => {
          lista.push(peli);
          return jsonfile.writeFile("./pelis.json", lista).then(() => {
            return true;
          });
        });
      }
    });
  }
}

export { PelisCollection, Peli };
