import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisColl: PelisCollection;
  constructor() {
    this.pelisColl = new PelisCollection();
  }
  get(options: any): Promise<any> {
    if (options.id) {
      return this.pelisColl.getById(options.id).then((r) => r);
    }
    if (options) {
      return this.pelisColl.search(options).then((r) => r);
    }
  }
  add(peli: Peli): Promise<boolean> {
    return this.pelisColl.add(peli).then((r) => r);
  }
}
export { PelisController };
