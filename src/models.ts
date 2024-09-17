// import * as jsonfile from "jsonfile";
// // sumo este import solo para que tsc lo tome y lo copie
// // en la app no usamos esto para acceder al archivo porque es dinámico
// import "./pelis.json";

// // no modificar estas propiedades, agregar todas las que quieras
// class Peli {
//   id: number;
//   title: string;
//   tags: string[];
// }

// class PelisCollection {
//   getAll(): Promise<Peli[]> {
//     return jsonfile.readFile("...laRutaDelArchivo").then(() => {
//       // la respuesta de la promesa
//       return [];
//     });
//   }
// }
// export { PelisCollection, Peli };
import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propleariedades, agregar todas las que quieras
// class Peli {
//   id: number;
//   title: string;
//   tags: string[];
// }

// class PelisCollection {
//   getAll(): Promise<Peli[]> {
//     return jsonfile.readFile("...laRutaDelArchivo").then(() => {
//       // la respuesta de la promesa
//       return [];
//     });
//   }
// }
// export { PelisCollection, Peli };

// import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile
      .readFile(__dirname + "/pelis.json")
      .then((pelis: Peli[]) => {
        //la respuesta de la promesa
        return pelis;
      });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((pelicula) => {
      const idDePeli = pelicula.find((peli) => peli.id === id);
      return idDePeli;
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno: Promise<any> = this.getById(peli.id).then(
      (peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          // magia que agrega la pelicula a un objeto data
          return this.getAll().then((pelis) => {
            pelis.push(peli);
            const promesaDos: Promise<any> = jsonfile.writeFile(
              __dirname + "/pelis.json",
              pelis
            );
            return promesaDos.then(() => {
              return true;
            });
          });
        }
      }
    );
    return promesaUno;
  }
  async search(options: SearchOptions) {
    const lista = await this.getAll();
    const listraFiltrada = lista.filter(function (p) {
      // console.log("este es el options ", options);
      let filteredResults = false;
      // let esteVa = false;
      // if (options.tag) {
      //   // lógica de tags
      //   // Si options.tag existe, verifica si la película tiene el tag correspondiente
      //   esteVa = p.tags.includes(options.tag);
      //   // si pasa cambio "esteVa" a true
      // }
      // if (options.title) {
      //   // lógica de title
      //   // Si options.title existe, verifica si la película tiene el título correspondiente
      //   esteVa = esteVa || p.title.includes(options.title);
      //   // si pasa cambio "esteVa" a true
      // }
      // return esteVa;

      if (options.title && options.tag) {
        filteredResults =
          p.title.includes(options.title) && p.tags.includes(options.tag);
      } else if (options.title) {
        filteredResults = p.title.includes(options.title);
      } else if (options.tag) {
        filteredResults = p.tags.includes(options.tag);
      }
      return filteredResults;
    });
    return listraFiltrada;
  }
}
export { PelisCollection, Peli };
