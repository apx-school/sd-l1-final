import { PelisCollection, Peli } from "./models";

class PelisController {
  pelis: PelisCollection
  constructor() {
    this.pelis = new PelisCollection
  }
}

export { PelisController };
