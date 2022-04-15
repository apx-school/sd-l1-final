import { PelisCollection, Peli } from "./models";
import * as _ from "lodash";

class PelisController {
  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  pelisCollection;
  get(options) {
    const optionSearch = options["search"];
    const optionId = options["id"];
    if (optionId) {
      return this.pelisCollection.getById(optionId).then((peli) => peli);
    }
    if (optionSearch["tag"] && optionSearch["title"]) {
      return this.pelisCollection.search(optionSearch).then((peli) => peli);
    }
    if (optionSearch["title"] || optionSearch["tag"]) {
      return this.pelisCollection.search(optionSearch).then((peli) => peli);
    } else return this.pelisCollection.getAll().then((peli) => peli);
  }
  add(peli: Peli) {
    return this.pelisCollection.add(peli).then((boolean) => boolean);
  }
}

export { PelisController };
