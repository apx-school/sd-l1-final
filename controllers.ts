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
    if (params.search) {
      let aux = {
        title: params.search.title,
        tag: params.search.tag,
        rating: params.search.rating,
      };
      return this.movies.search(aux).then((res) => {
        return res;
      });
    }
    if (Object.keys(params).length === 0) {
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
