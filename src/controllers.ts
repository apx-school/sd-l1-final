import { PelisCollection, Peli } from "./models";

class PelisController {
  movies: PelisCollection;
  constructor() {
    this.movies = new PelisCollection();
  }
}
export { PelisController };
