import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;
  constructor(pelisCol: PelisCollection) {
    this.pelisCollection = pelisCol;
  }

  get(options: any) {}
  add(peli: Peli) {}
}
export { PelisController };
