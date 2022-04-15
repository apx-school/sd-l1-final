import { rejects } from "node:assert";
import { resolve } from "node:path";
import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }
  async get(obj) {
    if ("id" in obj) {
      return this.collection.getById(obj.id);
    }
    if ("search" in obj) {
      return this.collection.search(obj.search);
    }
    if (obj._ != undefined) {
      // Si el argumento es ingresado desde la terminal la libreria minimist guarda el objeto search dentro
      // de la propiedad "_"
      if (obj._.includes("search")) {
        return this.collection.search(obj);
      }
    }
    if ("all" in obj) {
      return this.collection.getAll();
    }
  }
  add(peli: Peli) {
    return this.collection.add(peli);
  }
}
export { PelisController };
