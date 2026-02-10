import * as jsonfile from "jsonfile";
import * as path from "path";
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

const pelisFilePath = path.join(__dirname, "..", "src", "pelis.json");

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(pelisFilePath);
  }

  getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((pelis) => pelis.find((p) => p.id === id));
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli);
          const promesaDos = jsonfile.writeFile(pelisFilePath, pelis);
          return promesaDos.then(() => true);
        });
      }
    });
    return promesaUno;
  }

  search(options: SearchOptions): Promise<Peli[]> {
    return this.getAll().then((lista) => {
      const listaFiltrada = lista.filter((p) => {
        let esteVa = true;
        if (options.tag) {
          esteVa = esteVa && p.tags.includes(options.tag);
        }
        if (options.title) {
          esteVa =
            esteVa && p.title.toLowerCase().includes(options.title.toLowerCase());
        }
        return esteVa;
      });
      return listaFiltrada;
    });
  }
}
export { PelisCollection, Peli };
