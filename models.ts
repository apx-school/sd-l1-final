import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      // la respuesta de la promesa
      return json;
    });
  }
  getById(id: number) {
    return this.getAll().then((collection) => {
      const peliEncontrada = collection.find((p) => {
        return p.id == id;
      });
      return peliEncontrada;
    });
  }
  search(options: any) {
    if (options.title) {
      return this.getAll().then((collection) => {
        const buscaTitulos = collection.filter((s) => {
          var titulosEnMinuscula = s.title.toLocaleLowerCase();
          // var titulosEnMinuscula = s.title.toLowerCase();
          return titulosEnMinuscula.includes(options.title.toLowerCase());
        });
        return buscaTitulos;
      });
    } else if (options.tag) {
      return this.getAll().then((collection) => {
        const buscaTag = collection.filter((t) => {
          var tags = t.tags;
          // return tags.includes(options.tag.toLocaleLowerCase());
          return tags.includes(options.tag.toLowerCase());
        });
        return buscaTag;
      });
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((collection) => {
          var data = collection;
          collection.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };

const nuevaPelisCollection = new PelisCollection();

// const todos = nuevaPelisCollection.getAll().then((h) => {
//   console.log("getAll()", h);
// });

// const peliPorId = nuevaPelisCollection.getById(2).then((f) => {
//   console.log("getById()", f);
// });

// const peliPorTitulo = nuevaPelisCollection.search({ title: "G" }).then((p) => {
//   console.log("search x title", p);
// });

// const peliPorTag = nuevaPelisCollection.search({ tag: "aCCIÓN" }).then((t) => {
//   console.log("search x tag", t);
// });

// const agregaPeli = nuevaPelisCollection
//   .add({
//     id: 2,
//     title: "prueba",
//     tags: ["uno", "dos", "tres"],
//   })
//   .then((a) => {
//     console.log("add x Peli", a);
//   });
