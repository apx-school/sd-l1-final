import { PelisCollection, Peli } from "./models";
import * as _ from "lodash";

class PelisController {
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }

  get(options) {
    // Agrege que si get no recibe nada, devuelva el array completo.
    if (_.isEmpty(options)) {
      return this.pelisCollection.getAll();
    }

    if (options.id) {
      return this.pelisCollection.getById(options.id);
    }

    if (options.search) {
      if (options.search.tags && options.search.title) {
        let result = this.pelisCollection.search(options.search);

        // Aca hice este filter para asegurarme que si o si la peli que concuerde con tags y title
        // solamente me de los titulos que concuerden con options.search.title.
        let resultadoFinal = result.then((resultado) => {
          return resultado.filter((item) => {
            let searchTitleParams = options.search.title.toLowerCase();
            let peliConTags = item.title.toLowerCase();
            return peliConTags.includes(searchTitleParams);
          });
        });

        return resultadoFinal;
      }

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

  add(options) {
    if (options.add) {
      let resultadoAdd;

      resultadoAdd = this.pelisCollection.add(options.add);

      return resultadoAdd;
    }
  }
}

export { PelisController };

/* const testController = new PelisController();

testController.get({ id: 2 }).then((r) => console.log(r));

testController
  .get({ search: { tags: "fantasy", title: "p" } })
  .then((r) => console.log(r));

testController
  .add({ add: { id: 30, title: "test add", tags: ["tag1", "tag2"] } })
  .then((r) => console.log(r));
 */
