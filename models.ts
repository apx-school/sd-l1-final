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
  getAll(): Promise<Peli[]> {
    const pelis = jsonfile.readFile("./pelis.json").then((json) => {
      return json;
    });
    return new Promise((resolve, reject) => resolve(pelis))
  }
  getById(id: number): Promise<Peli> {
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
    console.log(options);
    return this.getAll().then((arrayMovs) => {

      if (options.title && options.tags) {

        const normalizedTitle = options.title.toLocaleLowerCase();

        const findTitleAndTag = arrayMovs.filter((titleAndTag) => {
          return ((titleAndTag.title.toLocaleLowerCase().includes(normalizedTitle) && titleAndTag.tags.includes(options.tags)))
        })
        //return findTitleAndTag;
        if (findTitleAndTag) {
          return Promise.resolve(findTitleAndTag);
        }

      } else if (options.title) {
        const normalizedTitle = options.title.toLocaleLowerCase();
        const findMov = arrayMovs.filter((name) => {
          return (name.title.toLocaleLowerCase().includes(normalizedTitle))
        });
        //return findMov;
        if (findMov) {
          return Promise.resolve(findMov)
        }

      } else if (options.tags) {
        const normalizedTag = options.tags.toLocaleLowerCase();
        const findTagMov = arrayMovs.filter((tag) => {
          return (tag.tags.includes(normalizedTag))
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
        });;
      }
    });
  }
}

export { PelisCollection, Peli }


