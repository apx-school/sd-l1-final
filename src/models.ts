//import * as jsonfile from "jsonfile";
import jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
import "./pelis.json";

type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const peliculas = await jsonfile.readFile(__dirname + "/pelis.json");
    return peliculas;
  }

  async getById(id: number): Promise<Peli> {
    const all = await this.getAll();
    return all.find((p) => id == p.id);
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        //magia que agrega la pelicula a un objeto data

        const data = this.getAll();
        const dataNueva = data.then((r) => {
          r.push(peli);
          return jsonfile.writeFile(__dirname + "/pelis.json", r).then(() => {
            return true;
          });
        });
      }
    });

    return promesaUno;
  }

  async search(options: SearchOptions) {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter(function (p) {
      let esteVa = false;
      if (options.tag && options.title) {
        // lógica de tags
        if (
          p.tags.includes(options.tag.toLowerCase()) &&
          p.title.toLowerCase().includes(options.title.toLocaleLowerCase())
        ) {
          // si pasa cambio "esteVa" a true
          esteVa = true;
        }
      } else if (options.title) {
        // lógica de title
        if (p.title.toLowerCase().includes(options.title.toLowerCase())) {
          // si pasa cambio "esteVa" a true
          esteVa = true;
        } else {
          esteVa = false;
        }
      } else if (options.tag) {
        // lógica de tags
        if (p.tags.includes(options.tag.toLowerCase())) {
          // si pasa cambio "esteVa" a true
          esteVa = true;
        }
      }
      return esteVa;
    });

    return listaFiltrada;
  }
}
export { PelisCollection, Peli };

// //de aca para abajo van las pruebas mientras codeo

// const pelis = new PelisCollection();
// // const all = pelis.getAll().then((pelis) => {
// //   console.log(pelis);
// //   return pelis;
// // });

// const peliNueva = new Peli();
// peliNueva.id = 10;
// peliNueva.title = "peliNueva";
// peliNueva.tags = ["agregada"];
// //console.log(peliNueva);

// // pelis.add(peliNueva);

// // console.log(
// //   pelis.getById(2).then((peli) => {
// //     console.log(peli);
// //     return peli;
// //   })
// // );

// const id = 3;

// pelis.getById(id).then((p) => {
//   console.log(p);
//   return p;
// });

// pelis.addNuevo(peliNueva);

// const options = { tag: "favorita" };
// console.log(
//   pelis.search(options).then((pelis) => {
//     console.log(pelis);
//     return pelis;
//   })
// );

//pelis.search(options);
