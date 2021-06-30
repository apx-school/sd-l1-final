import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  constructor() {
    this.getAll().then((value) => {
      this.data = value
    })
  }
  getAll(): Promise<any> {
    const pelis = jsonfile.readFile("./pelis.json").then((json) => {
      return json;
    });
    return new Promise((resolve, reject) => resolve(pelis))
  }
  getById(id: number) {
    return this.getAll().then((movie) => {
      const result = movie.find((mov) => {
        return mov.id == id;
      });

      return result
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((arrayMovs) => {
      if (options.title && options.tag) {
        const findTitleAndTag = arrayMovs.filter((titleAndTag) => {
          return ((titleAndTag.title.includes(options.title) && titleAndTag.tags.includes(options.tag)))
        })
        return findTitleAndTag;

      } else if (options.title) {
        const findMov = arrayMovs.filter((name) => {
          return (name.title.includes(options.title))
        });
        return findMov

      }
      else if (options.tag) {
        const findTagMov = arrayMovs.filter((peli) => {
          return (peli.tags.includes(options.tag))
        });

        return findTagMov
      }
    })
  }
  add(movie: Peli): Promise<boolean> {
    return this.getById(movie.id).then((listedMovie) => {
      if (listedMovie) {
        return false;
      } else {
        this.data.push(movie);
        return jsonfile.writeFile("./pelis.json", this.data).then(() => {
          return true;
        });
      }
    });
  }
}

export { PelisCollection, Peli }


