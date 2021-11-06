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
    return this.getAll().then((json: any) => {
      if (options.title && options.tag) {
        return json.filter((obj) => {
          return (
            obj.title.includes(options.title) && obj.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return json.filter((obj) => {
          return obj.title.includes(options.title);
        });
      } else if (options.tag) {
        return json.filter((obj) => {
          return obj.tags.includes(options.tag);
        });
      }
    });
  }

  // search(options: any) {
  //   return this.getAll().then((collection) => {
  //     if (options.title && options.tag) {
  //       const resultadoTitle = collection.filter((films) =>
  //         films.title.toLowerCase().includes(options.title.toLowerCase())
  //       );
  //       return resultadoTitle.filter((film) =>
  //         film.tags.find((a) => a == options.tag.toLowerCase())
  //       );
  //     } else if (options.title) {
  //       const resultadoTitle = collection.filter((films) =>
  //         films.title.toLowerCase().includes(options.title.toLowerCase())
  //       );
  //       return resultadoTitle;
  //     } else if (options.tag) {
  //       const resultadoTags = collection.filter((films) =>
  //         films.tags.find((b) => b == options.tag.toLowerCase())
  //       );
  //       return resultadoTags;
  //     }
  //   });
  // }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((collection) => {
          // var data = collection;
          collection.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", collection);
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

//getAll
// nuevaPelisCollection.getAll().then((getAll) => {
//   console.log(getAll);
// });

//getById
// nuevaPelisCollection.getById(1).then((getById) => {
//   console.log(getById);
// });

//search
//title
// nuevaPelisCollection.search({ title: "S" }).then((search) => {
//   console.log(search);
// });
//tag
// nuevaPelisCollection.search({ tag: "cOMeDia" }).then((search) => {
//   console.log(search);
// });
//title & tag
// nuevaPelisCollection.search({ title: "T", tag: "drama" }).then((titleTag) => {
//   console.log(titleTag);
// });

//add
// const nuevaPeli = new Peli();
// nuevaPeli.id = 10;
// nuevaPeli.title = "Nueva peli";
// nuevaPeli.tags = ["prueba 1", "prueba 2"];

// nuevaPelisCollection.add(nuevaPeli).then((add) => {
//   console.log(add);
// });
