import { PelisCollection, Peli } from "./models";

class PelisController {
  peli: any;
  promise: Promise<Peli[]>;
  constructor() {
    this.peli = new PelisCollection();
    const promise = this.peli.getAll();
    this.promise = promise;
  }
  get(options) {
    if (options._[0] == ["search"] && options.title) {
      /* return this.peli.search(options); */
      const searchPeli = this.peli.search(options);
      searchPeli.then((searched) => {
        return console.log(searched);
      });
    } else if (options._[0] == ["search"] && options.tag) {
      /* return this.peli.search(options); */
      const searchPeli = this.peli.search(options);
      searchPeli.then((searched) => {
        return console.log(searched);
      });
    } else if (options._[0] == ["get"]) {
      /* return this.peli.getById(options._[1]); */
      const findById = this.peli.getById(options._[1]);
      findById.then((byId) => {
        return console.log(byId);
      });
    } else if (options._[0] == ["add"]) {
      /*       delete options._;
      return this.peli.add(options); */
      delete options._;
      const addPelis = this.peli.add(options);
      addPelis.then((add) => {
        return console.log(add);
      });
    } else {
      const allPelis = this.peli.getAll();
      allPelis.then((all) => {
        return console.log(all);
      });
    }
  }
}

export { PelisController };
