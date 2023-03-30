import * as jsonfile from "jsonfile";
import * as lodash from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];

  async getAll(): Promise<Peli[]> {
    const json = await jsonfile.readFile(__dirname + "/pelis.json");
    return (this.peliculas = json);
  }

  async getById(id: number): Promise<Peli> {
    await this.getAll();
    return this.peliculas.find((peli) => peli.id == id);
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = await this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((peliculas) => {
          peliculas.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });

    return promesaUno;
  }

  async search(options: any): Promise<Peli[]> {
    await this.getAll();

    if (options.title && options.tag) {
      return this.peliculas.filter((pel) => {
        return (
          pel.title.includes(options.title) && pel.tags.includes(options.tag)
        );
      });
    }

    if (options.title) {
      return this.peliculas.filter((pel) => {
        return pel.title.includes(options.title);
      });
    }

    if (options.tag) {
      return this.peliculas.filter((pelicula) => {
        return pelicula.tags.includes(options.tag);
      });
    }
  }
}

// Para las pruebas locales ejecutar: ts-node models.ts
// ---------------------------------------- PRUEBA DEVOLUCIÓN DE DATOS
/*
const collection = new PelisCollection();
// console.log(collection.getAll()); // Promise { <pending> }
// Lo trato como promesa con el .then, es decir: una vez se resuelva, hacer...
collection.getAll().then((result) => {
  console.table(result);
});
*/
// ---------------------------------------- FIN

// ---------------------------------------- PRUEBA GETBYID
/*
const collection = new PelisCollection();
collection.getById(2).then((result) => {
  console.log(result);
});
*/
// ---------------------------------------- FIN

// ---------------------------------------- PRUEBA ADD
/*
const collection = new PelisCollection();
// mock:
const peliToAdd = new Peli();
peliToAdd.id = 11;
peliToAdd.title = "Película Agregada 1";
peliToAdd.tags = ["one", "two", "three"];

collection.add(peliToAdd).then((result) => {
  console.log(result);
});

collection.getAll().then((result) => {
  console.table(result);
});
*/
// ---------------------------------------- FIN

// ---------------------------------------- PRUEBAS SEARCH
// const collection = new PelisCollection();

// 1)
// collection.search({ title: "La" }).then((result) => {
//   console.table(result);
// });

// 2)
// collection.search({ tag: "Action" }).then((result) => {
//   console.table(result);
// });

// 3)
// collection.search({ title: "La", tag: "Action" }).then((result) => {
//   console.table(result);
// });
// ---------------------------------------- FIN

export { PelisCollection, Peli };
