import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.data = json;
      return json;
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((json) => {
      return json.find((item) => item.id == id);
    });
  }

  add(peli: Peli): Promise<boolean> {
    const firstPromise = this.getById(peli.id).then((existantPeli) => {
      if (existantPeli) {
        return false;
      } else {
        this.data.push(peli);
        const secondPromise = jsonfile.writeFile("./pelis.json", this.data);
        return secondPromise.then(() => {
          return true;
        })
      }
    })

    return firstPromise;
  }
  // search(options: any): Promise<any> {
  //   return this.getAll().then(moviesArray => {
  //     let movies = moviesArray;

  //     if (options.title) {
  //       movies = movies.filter(movie => movie.title.includes(options.title));
  //     }
  //     if (options.tag) {
  //       movies = movies.filter(movie => movie.tags.includes(options.tag));
  //     }

  //     return movies;
  //   })

  // }
}
export { PelisCollection, Peli };
