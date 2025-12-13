import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[];

  constructor() {
    this.pelis = [];
  }

  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./src/pelis.json").then((pelis: Peli[]) => {
      // la respuesta de la promesa
      return pelis;
    });
  }

  async getById(id: number): Promise<Peli> {
    const allPelis = await this.getAll();
    const peliFound = allPelis.find((peli) => peli.id === id);
    return peliFound;
  }

  async search(options: any): Promise<Peli[]> {
    const allPelis = await this.getAll();
    let pelisFound = allPelis;
    if (options.title) {
      pelisFound = pelisFound.filter((peli) =>
        peli.title.toLowerCase().includes(options.title.toLowerCase())
      );
    }
    if (options.tag) {
      pelisFound = pelisFound.filter((peli) =>
        peli.tags
          .map((tag) => tag.toLowerCase())
          .includes(options.tag.toLowerCase())
      );
    }
    return pelisFound;
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliFound) => {
      if (peliFound) {
        return false;
      } else {
        return this.getAll().then((allPelis) => {
          allPelis.push(peli);
          return jsonfile.writeFile("./src/pelis.json", allPelis).then(() => {
            return true;
          });
        });
      }
    });
  }
}

export { PelisCollection, Peli };

// código de prueba - no modificar

let model = new PelisCollection();

/* console.log("model.getAll()...");
model.getAll().then((pelis) => {
  console.log(pelis);
}); */

/* model.getById(2).then((peli) => {
  console.log("model.getById(2)...");
  console.log(peli);
}); */

/* model.search({ tag: "drama" }).then((pelis) => {
  console.log('model.search({ title: "avengers", tag: "action" })...');
  console.log(pelis);
}); */

/* model
  .add({ id: 6, title: "Batman Begins", tags: ["action", "drama"] })
  .then((added) => {
    console.log("model.add(...)...");
    console.log(added);
  }); */
