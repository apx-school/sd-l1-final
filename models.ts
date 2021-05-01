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
    return jsonfile.readFile("./pelis.json").then(json => {
      this.data = [...json];
      return json;
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((movies) => {
      return movies.find(movie => movie.id == id);
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((existantPeli) => {
      if (existantPeli) {
        return false;
      } else {
        this.data.push(peli);
        return jsonfile.writeFile("./pelis.json", this.data).then(() => true);
        
      }
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then(moviesArray => {
      let movies;

      if (options.title) {
        movies = moviesArray.filter(movie => movie.title.includes(options.title));
      }
      if (options.tag) {
        movies = movies.filter(movie => movie.tags.includes(options.tag));
      }

      return movies;
    })

  }
}
export { PelisCollection, Peli };
