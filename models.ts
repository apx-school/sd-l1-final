import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  allMovies: Peli[];

  getAll(): Promise<any> {
    const jsonpelis = jsonfile.readFile("./pelis.json").then((x) => {
      this.allMovies = x;
      return x;
    });
    return jsonpelis;
  }

  getById(id: number) {
    return this.getAll().then((peliculas) => {
      return peliculas.find((x) => x.id == id);
    });
  }

  search(options?) {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((x) => {
          return (
            x.title.includes(options.title) && x.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return peliculas.filter((x) => {
          return x.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((x) => {
          return x.tags.includes(options.tag);
        });
      }
    });
  }

  add(peli: Peli) {
    const promesaUno = this.getById(peli.id).then((peliExiste) => {
      if (peliExiste) {
        return false;
      } else {
        this.allMovies.push(peli);
        const data = this.allMovies;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

// let object = new PelisCollection();
// object.getById(3).then((x) => {
//   console.log(x);
// });

// let object2 = new PelisCollection();
// object2.search({tag: "accion"}).then((x) => {
//   console.log(x);
// });

// let object3 = new PelisCollection();
// object3.add({id:999,title:"hola", tags:["test propio"]}).then((x) => {
//   console.log(x);
// });

export { PelisCollection, Peli };
