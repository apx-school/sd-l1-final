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
  peliculas: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./src/pelis.json").then((data) => {
      // la respuesta de la promesa
      this.peliculas = data;
      return data;
    });
  }
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    return pelis.find((p) => p.id === id) || null;
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data

        const data = this.peliculas;
        this.peliculas.push(peli);
        const promesaDos = jsonfile.writeFile("./src/pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    let resultado = lista;

    if (options.title) {
      resultado = resultado.filter((p) =>
        p.title.toLowerCase().includes(options.title.toLowerCase())
      );
    }
    if (options.tag) {
      resultado = resultado.filter((p) =>
        p.tags
          .map((tag) => tag.toLowerCase())
          .includes(options.tag.toLowerCase())
      );
    }
    return Promise.resolve(resultado);
  }
}
export { PelisCollection, Peli };
