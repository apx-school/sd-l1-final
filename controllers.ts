import { rejects } from "node:assert";
import { resolve } from "node:path";
import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }
  chooseMethod() {
    return this.get();
  }
  get() {
    return this.collection.getById(2);
  }
  add(obj: Peli) {
    this.collection.add(obj);
  }
}
export { PelisController };
