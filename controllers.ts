import { PelisCollection, Peli } from './models';

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }

  get(options): Promise<any> {
    if (options.id) {
      return this.pelis.getById(options.id).then((r) => r);
    }
    if (options.search) {
      return this.pelis.search(options.search).then((r) => r);
    } else {
      return this.pelis.getAll();
    }
  }

  add(peli: Peli) {
    return this.pelis.add(peli);
  }
}
export { PelisController };
