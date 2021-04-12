import { PelisCollection, Peli } from "./models";
import * as isEmpty from "lodash/isEmpty";

/*
class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
    this.pelis.getAll();
  }

  get(options?) {
    let result;

    if (!options) {
      result = this.pelis.getAll();
    } else if (options.id) {
      result = this.pelis.getById(options.id);
    } else if (options.search.title) {
      result = this.pelis.search(options.search);
    } else if (options.search.tag) {
      result = this.pelis.search(options.search);
    }

    return result;
  }

  add(params) {
    let result = this.pelis.getById(params);

    return result;
  }
}*/

class PelisController {
  pelis: PelisCollection;
  constructor() {
    this.pelis = new PelisCollection();
  }
  get(options) {
    if (options.id) {
      return this.pelis.getById(options.id);
    }
    if (options.search) {
      return this.pelis.search(options.search);
    }
    if (isEmpty(options)) {
      return this.pelis.getAll();
    }
  }
  add(peli) {
    return this.pelis.add(peli);
  }
}

export { PelisController };
