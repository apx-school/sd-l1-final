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

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./src/pelis.json").then((peliculas) => {
      // el archivo tiene estructura [[peliculas]], tomamos el primer elemento
      return peliculas[0] || [];
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((peliculas) => {
      return peliculas.find((peli) => peli.id === id);
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        return this.getAll().then((peliculasActuales) => {
          const data = [peliculasActuales.concat(peli)];
          const promesaDos = jsonfile.writeFile("./src/pelis.json", data);

          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });

    return promesaUno;
  }

  search(options: SearchOptions): Promise<Peli[]> {
    return this.getAll().then((lista) => {
      const listaFiltrada = lista.filter((p) => {
        let esteVa = false;
        if (options.tag) {
          // lógica de tags - busca si el tag está incluido en el array de tags
          if (p.tags.includes(options.tag)) {
            esteVa = true;
          }
        }
        if (options.title) {
          // lógica de title - busca si el string está incluido en el título
          if (p.title.toLowerCase().includes(options.title.toLowerCase())) {
            esteVa = true;
          }
        }
        return esteVa;
      });

      return listaFiltrada;
    });
  }
}
export { PelisCollection, Peli };
