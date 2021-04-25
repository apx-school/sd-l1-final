import * as jsonfile from "jsonfile";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((allJSON) => {
      this.data = allJSON;
      return allJSON;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((json) => {
      return json.find((e) => e.id == id);
    });
  }
  //este método lo hice con la ayuda que da el artículo
  add(movie: Peli): Promise<boolean> {
    const promise = this.getById(movie.id).then((movieAlreadyExists) => {
      if (movieAlreadyExists) {
        return false;
      } else {
        this.data.push(movie);
        const promiseTwo = jsonfile.writeFile("./pelis.json", this.data);

        return promiseTwo.then(() => {
          return true;
        });
      }
    });

    return promise;
  }

  search(params: any): Promise<Peli[]> {
    return this.getAll().then((json) => {
      let result: Peli[] = [];
      if (params.title && params.tag) {
        result = json.filter((e) => {
          return (
            e.title.toLowerCase().includes(params.title.toLowerCase()) &&
            e.tags.includes(params.tag.toLowerCase())
          );
        });
      } else if (params.title) {
        result = json.filter((e) => {
          return e.title.toLowerCase().includes(params.title.toLowerCase());
        });
      } else if (params.tag) {
        result = json.filter((e) => {
          return e.tags.includes(params.tag.toLowerCase());
        });
      }
      return result;
    });
  }
}
export { PelisCollection, Peli };
