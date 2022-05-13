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

      async function searchPelisByTitle() {
        const byTitle = await this.peli.search(options);
        console.log(byTitle);
      }
      searchPelisByTitle();

      /* const searchPeli = this.peli.search(options);
      searchPeli.then((searched) => {
        return console.log(searched);
      }); */
    } else if (options._[0] == ["search"] && options.tag) {
      /* return this.peli.search(options); */

      async function searchPelisByTag() {
        const byTag = await this.peli.search(options);
        console.log(byTag);
      }
      searchPelisByTag();

      /* const searchPeli = this.peli.search(options);
      searchPeli.then((searched) => {
        return console.log(searched);
      }); */
    } else if (options._[0] == ["get"]) {
      /* return this.peli.getById(options._[1]); */

      async function getPelisById() {
        const byId = await this.peli.getById(options._[1]);
        console.log(byId);
      }
      getPelisById();

      /* this.peli.getById(options._[1]).then((byId) => {
        return console.log(byId);
      }); */
    } else if (options._[0] == ["add"]) {
      /* delete options._;
      return this.peli.add(options); */

      async function addNewPelis() {
        delete options._;
        const newPeli = await this.peli.add(options);
        console.log(newPeli);
      }
      addNewPelis();

      /* delete options._;
      const addPelis = this.peli.add(options);
      addPelis.then((add) => {
        return console.log(add);
      }); */
    } else {
      /* return this.peli.getAll(); */

      this.promise.then((all) => {
        return console.log(all);
      });
    }
  }
}

export { PelisController };
