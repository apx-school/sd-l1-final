import { PelisCollection, Peli } from "./models";

class PelisController {
  listaPelis: PelisCollection;
  promesa: Promise<Peli[]>;
  constructor() {
    this.listaPelis = new PelisCollection();
    const nuevaPromesa = this.listaPelis.getAll();
    this.promesa = nuevaPromesa;
  }

  get(options) {
    //si la opcion id existe entra
    if (options.id) {
      return this.listaPelis.getById(options.id).then((peli) => {
        return peli;
      });
    }
    //si existe, title o tag, o incluso ambas entra
    else if (options.title || options.tag) {
      return this.listaPelis.search(options).then((peliculas) => {
        return peliculas;
      });
    }
    //si no hay ni id, title o tag, entonce retorna todas las pelis
    else {
      return this.listaPelis.getAll().then((peliculas) => {
        return peliculas;
      });
    }
  }
  add(peli: Peli) {
    return this.listaPelis.add(peli);
  }
}

/*
function main() {
  const listaPeliculas = new PelisController();
  listaPeliculas.promesa.then((peliculas) => {
    listaPeliculas.listaPelis.peliculas = peliculas;
    console.log(listaPeliculas.listaPelis.peliculas);
  });
  listaPeliculas.get({ id: 7 }).then((peli) => {
    console.log(peli);
  });
  listaPeliculas
    .add({
      id: 13,
      title: "Dragon Ball: La batalla de los dioses",
      tags: ["Accion", "Shonen", "Aventura", "Comedia"],
    })
    .then(() => {
      listaPeliculas.promesa.then((peliculas) => {
        listaPeliculas.listaPelis.peliculas = peliculas;
        console.log(listaPeliculas.listaPelis.peliculas);
      });
    });
}

main();
*/

export { PelisController };
