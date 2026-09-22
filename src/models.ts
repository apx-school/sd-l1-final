import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "../pelis.json"
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id?: number = undefined;
  title: string = "";
  tags: string[] = [];
}

type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  getAll() {
    return jsonfile
      .readFile("./pelis.json")
      .then((pelis: Peli[]) => {
        return pelis;
      })
      .catch((err: Error) => {
        console.error("Error reading pelis.json:", err);
        return [];
      });
  }
  getById(id: number | undefined) {
    return this.getAll()
      .then((peli: Peli[]) => {
        const resultado = peli.find((pelicula: Peli) => pelicula.id === id);
        return resultado;
      })
      .catch((err: Error) => {
        console.error("Error getting movie by ID:", err);
        return undefined;
      });
  }
  add(peli: Peli) {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((pelis: Peli[]) => {
          const data = [...pelis, peli];
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos
            .then(() => {
              return true;
            })
            .catch((err: Error) => {
              console.error("Error writing to pelis.json:", err);
              return false;
            });
        });
      }
    });
    return promesaUno;
  }
  search(options: SearchOptions) {
    return this.getAll()
      .then((pelis: Peli[]) => {
        const listafiltrada = pelis.filter((peli: Peli) => {
          let esteVa = false;
          if (options.tag) {
            if (peli.tags.includes(options.tag)) {
              esteVa = true;
            }
          }
          if (options.title) {
            if (
              peli.title
                .toLocaleLowerCase()
                .includes(options.title.toLocaleLowerCase())
            ) {
              esteVa = true;
            }
          }
          if (options.title && options.tag) {
            if (
              peli.title.toLowerCase().includes(options.title.toLowerCase()) &&
              peli.tags.includes(options.tag)
            ) {
              esteVa = true;
            }
          }

          return esteVa;
        });
        return listafiltrada;
      })
      .catch((err: Error) => {
        console.error("Error searching movies:", err);
        return [];
      });
  }
}
export { PelisCollection, Peli };
