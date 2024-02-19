import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  listaPelis: PelisCollection;

  constructor() {
    this.listaPelis = new PelisCollection();
  }

  async add(peli: Peli) {
    return await this.listaPelis.add(peli);
  }

  async get(options?: Options) {
    if (options == undefined) {
      return await this.listaPelis.getAll();
    } else if (options.id) {
      return await this.listaPelis.getById(options.id);
    } else if (options.search) {
      return await this.listaPelis.search(options.search);
    }
  }
}

//const testing = new PelisController();
/* console.log(
  testing.add({ id: 5, title: "Ghostbusters", tags: ["sci-fi", "accion"] })
); */ //WORKS
//console.log(testing.get().then((e) => console.log(e))); // GET ALL WORKS
//testing.get({ id: 3 }).then((e) => console.log(e)); // ID WORKS
/* console.log(
  testing.get({ search: { tag: "accion" } }).then((e) => console.log(e))
); */ //WORKS
/* console.log(
  testing.get({ search: { title: "La" } }).then((e) => console.log(e))
); */ //WORKS
/* console.log(
  testing
    .get({ search: { title: "La", tag: "accion" } })
    .then((e) => console.log(e))
); */ //WORKS

/* async function tester() {
  const testing = new PelisController();
  await testing.add({ id: 15, title: "Ghost", tags: ["sci-fi", "accion"] });
  await testing.get({ id: 15 }).then((e) => console.log(e));
}

tester(); */ //WORKS

export { PelisController };
