import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  title: string;
  id: number;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = []
  getAll() {
    return jsonfile.readFile("./pelis.json").then((json) => {
      this.pelis = json;
      return this.pelis;
    })
  }

  getById(id: number) {
    return this.getAll().then((item) => {
      return (item.find((p) => p.id == id));
    });
  }
  search(options: any) {

    return this.getAll().then((res) => {
      let movies = res;
      if (options.hasOwnProperty("title")) {
        movies = movies.filter((p) => p.title.includes(options.title));
      }
      if (options.hasOwnProperty("tags")) {
        movies = movies.filter((p) => p.tags.includes(options.tags))
      }
      return movies;

    });
  }

  add(movie: Peli) {
    return this.getAll().then((json) => {
      if (json.find(item => item.id == movie.id)){
        return false;
      } else {
        let aux = json;
        aux.push(movie)
        jsonfile.writeFile("./pelis.json", aux).then(() =>{
          return true;
        });
      }
    })
  }


}

export { PelisCollection, Peli };

const test = new PelisCollection();
const options = new Peli();
options.id = 99;
options.title = "Tobias peli";
options.tags = ["accion", "comedia"]
const promesa = new Promise((resolve, reject) => {
  resolve(test.add(options));
  reject("Error")
})

