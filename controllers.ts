import { PelisCollection, Peli } from "./models";

class PelisController {
  constructor() {
    const collection = new PelisCollection();
    this.collection = collection;
  }
  collection: PelisCollection;

  get(options) {}
}
export { PelisController };
