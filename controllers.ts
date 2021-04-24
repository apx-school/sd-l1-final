import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  constructor() {
    this.movies = new PelisCollection();
  }
  get(params: any): Promise<any> {
    if (params.id) {
      return this.movies.getById(params.id).then((res) => {
        return res;
      });
    }
    if (params.title || params.tag) {
      console.log(params);
      console.log("llegué a params.search y voy a retornar");
      return this.movies.search(params).then((res) => {
        return res;
      });
    }
    if (Object.keys(params).length === 0) {
      //console.log("no tengo contenido");
      return this.movies.getAll().then((res) => {
        return res;
      });
    }
  }
  add(movie: Peli): Promise<boolean> {
    return this.movies.add(movie).then((res) => {
      return res;
    });
  }
  PelisControllerOptions(options): Promise<any> {
    if (options.id && options.title && options.tags) {
      return this.add(options).then((res) => {
        console.log(res);
      });
    } else {
      return this.get(options).then((res) => {
        console.log(res);
      });
    }
  }
}
export { PelisController };
