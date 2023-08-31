import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
interface PeliControllerOptions {
  action?: "search" | "add";
  params?: Peli;
}

class PelisController {
  peliculas: PelisCollection;
  promesa: Promise<any>;
  constructor() {
    this.peliculas = new PelisCollection();
    const promesa = this.peliculas.load();
    this.promesa = promesa;
  }
  async add(peli: Peli) {
    return await this.peliculas.add(peli);
  }

  async get(options?: Options) {
    if (options == null) {
      return await this.peliculas.getAll();
    } else if (options.id) {
      return await this.peliculas.getById(options.id).then((res) => {
        return res;
      });
    } else if (options.search) {
      if (options.search.title && options.search.tag) {
        return await this.peliculas.search(options.search);
      } else if (options.search.title) {
        return await this.peliculas.search(options.search);
      } else if (options.search.tag) {
        return await this.peliculas.search(options.search);
      }
    } else {
      return this.peliculas.load();
    }
  }
}
export { PelisController };
// const probandoController = new PelisController();
// console.log(probandoController.peliculas);
// probandoController.get({ id: 1 }).then((res) => console.log(res.title));
// probandoController
//   .get({ search: { title: "El diario de Noa" } })
//   .then((res) => console.log(res));
// // probandoController.get().then((res) => console.log(res));
// // probandoController.get({ id: 2 }).then((res) => console.log(res));
// probandoController
//   .get({ search: { title: "El diario de Noa" } })
//   .then((res) => console.log(res));
// probandoController
//   .get({ search: { tag: "Drama" } })
//   .then((res) => console.log(res));
