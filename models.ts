import * as jsonfile from "jsonfile";
import * as lodash from "lodash";
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  arrayPelis: Peli[];
  getAll(): Promise<Peli[]> {
    const todasLasPelis = jsonfile
      .readFile("./pelis.json")
      .then((resultado) => {
        return (this.arrayPelis = resultado);
      });
    return todasLasPelis;
  }
  getById(id: number) {
    return this.getAll().then((peliId) => {
      const peliculaEncontrada = peliId.find((peliculaId) => {
        return peliculaId.id == id;
      });
      return peliculaEncontrada;
    });
  }
  search(options: any) {
    if (options.search && options.tag) {
      console.log("ahora estoy entrando aca");
      return this.getAll().then((peliTagYSerch) => {
        const parametrosEncontrados = peliTagYSerch.filter((peliEncontrada) => {
          return (
            peliEncontrada.title.includes(options.search) &&
            peliEncontrada.tags.includes(options.tag)
          );
        });

        return parametrosEncontrados;
      });
    } else if (options.search) {
      return this.getAll().then((peliSerch) => {
        const parametroEncontrado = peliSerch.filter((peliEncontrada) => {
          console.log("estoy entrando aca");
          return peliEncontrada.title.includes(options.search);
        });
        return parametroEncontrado;
      });
    } else if (options.tag) {
      return this.getAll().then((peliTag) => {
        console.log("ultimo aca");
        const parametroTagEncontrado = peliTag.filter((peliEncontrada) => {
          return peliEncontrada.tags.includes(options.tag);
        });
        return parametroTagEncontrado;
      });
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const data = peli;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then((peli) => {
          console.log("la pelicula se agrego correctamente");
          return true;
        });
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };

const pelis = new PelisCollection();
const resultado1 = pelis
  .add({
    id: 42,
    title: "Piratas del cari",
    tags: ["Accion", "Aventura", "Drama"],
  })
  .then((i) => {
    return console.log(i);
  });

//const pelis = new PelisCollection();
//const resultado1 = pelis.search({ search: "L", tag: "Drama" }).then((i) => {
//  return console.log(i);
//});

//const pelis = new PelisCollection();
//const resultado1 = pelis.search({ search: "El" }).then((i) => {
//  return console.log(i);
//});

//const peli = new PelisCollection();
//const resultado = peli.search({ tag: "Romance" }).then((i) => {
//  return console.log(i);
//});
