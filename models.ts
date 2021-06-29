import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id?: number;
  title?: string;
  tags?: string[];
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

      if (result) {
        return Promise.resolve(result);
      }
      //return Promise.reject("No se encontro la pelicula")
    });
  }
  search(options: any) {
    return this.getAll().then((arrayMovs) => {

      if (options.title && options.tags) {
        const findTitleAndTag = arrayMovs.filter((titleAndTag) => {
          return ((titleAndTag.title.includes(options.title) && titleAndTag.tags.includes(options.tags)))
        })
        //return findTitleAndTag;
        if (findTitleAndTag) {
          return Promise.resolve(findTitleAndTag);
        }

      } else if (options.title) {
        const findMov = arrayMovs.filter((name) => {
          return (name.title.includes(options.title))
        });
        if (findMov) {
          return Promise.resolve(findMov)
        }

      } else if (options.tags) {
        const findTagMov = arrayMovs.filter((peli) => {
          return (peli.tags.includes(options.tags))
        });
        if (findTagMov) {
          return Promise.resolve(findTagMov)
        }
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


