import { PelisCollection, Peli } from "./models";

class PelisController {
  pelisCollection: PelisCollection;

  constructor() {
    this.pelisCollection = new PelisCollection();
  }
  get(option: any) {
    if (option.id) {
      return this.pelisCollection.getById(option.id).then((peli) => {
        return peli;
      });
    } else if (option.search) {
      return this.pelisCollection.search(option.search).then((peli) => {
        return peli;
      });
    } else {
      return this.pelisCollection.getAll().then((todaslasPelis) => {
        return todaslasPelis;
      });
    }
  }
  add(peli: Peli) {
    return this.pelisCollection.add(peli);
  }
}

function processOptions(option) {
  const peliculas = new PelisController();
  if (option._[0] == "get") {
    const peliGet = { id: option._[1] };
    peliculas.get(peliGet).then((p) => {
      return console.log(p);
    });
  } else if (option._[0] == "search") {
    const peliSearch = { search: { title: option.search, tag: option.tag } };
    peliculas.get(peliSearch).then((p) => {
      return console.log(p);
    });
  } else if (option._[0] == "add") {
    const peliAdd = { id: option.id, title: option.title, tags: [option.tag] };
    peliculas.add(peliAdd);
  } else {
    peliculas.pelisCollection.getAll().then((p) => {
      console.log(p);
    });
  }
}

export { PelisController, processOptions };

//processOptions(["get", 1]).then((p) => {
// console.log(p);
//});

//peli.pelisCollection.getAll().then((p) => {
// return console.log(p);
//});
//const pelicula = new PelisController();
//pelicula.add({ id: 2123, title: "Avengers", tags: ["Accion", "Ciencia"] })))

//const pelis = new PelisCollection();
//const resultado1 = pelis.search({ title: "L" }).then((i) => {
//  return console.log(i);
//});
