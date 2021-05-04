import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisColl: PelisCollection;
  constructor() {
    this.pelisColl = new PelisCollection();
  }
  get(options): Promise<any> {
    if (options.id) {
      return this.pelisColl.getById(options.id).then((r) => r);
    } else {
      return this.pelisColl.search(options.search).then((r) => r);
    }
  }
  add(peli): Promise<boolean> {
    const pelicula = new Peli();
    pelicula.id = peli.id;
    pelicula.title = peli.title;
    pelicula.tags = peli.tags;

    return this.pelisColl.add(pelicula).then((r) => r);
  }
}
export { PelisController };
