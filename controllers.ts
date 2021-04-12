import { PelisCollection, Peli } from "./models";
import * as _ from "lodash";

class PelisController {
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  get(options):Promise<Peli> | Promise<Peli[]>{
    // Agrege que si get no recibe nada, devuelva el array completo.
    if (_.isEmpty(options)) {
      return this.pelisCollection.getAll();
    }

    if (options.id) {
      return this.pelisCollection.getById(options.id);
    }

    if (options.search) {
      
      if (options.search.title) {
        return this.pelisCollection.search(options.search);
      }

      if (options.search.tags) {
        return this.pelisCollection.search(options.search);
      }

      if (_.isEmpty(options.search)) {
        return this.pelisCollection.getAll();
      }
    }
  }

  add(options):Promise<boolean> {
    if (options.add) {
      return this.pelisCollection.add(options.add);}
  }
}

export { PelisController };

/* const testController = new PelisController();

testController.get({ id: 4 }).then((r) => console.log(r));


testController
  .get({ search: { tags: "art", title: "c" } })
  .then((r) => console.log(r));


  
testController
  .add({ add: { id: 30, title: "test add", tags: ["tag1", "tag2"] } })
  .then((r) => console.log(r));

 */