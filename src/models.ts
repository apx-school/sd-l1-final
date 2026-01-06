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
    return jsonfile.readFile(__dirname + "/pelis.json").then((res) => {
      // la respuesta de la promesa
      return res;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((peli) => {
      const resultado = peli.find((c) => {
        return c.id === id;
      });
      return resultado;
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        console.log("Ya existe una pelicula con ese Id");
        return false;
      } else {
        return this.getAll().then((res) => {
          res.push(peli);
          const promesaDos = jsonfile.writeFile(__dirname + "/pelis.json", res);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });
    return promesaUno;
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    const listaFiltrada = lista.filter((p) => {
      let coincideTitle = true;
      let coincideTag = true;
      if (options.title) {
        coincideTitle = p.title
          .toLowerCase()
          .includes(options.title.toLowerCase());
      }
      if (options.tag) {
        coincideTag = p.tags.some(
          (t) => t.toLowerCase() === options.tag.toLowerCase()
        );
      }
      return coincideTitle && coincideTag;
    });
    return listaFiltrada;
  }
}
export { PelisCollection, Peli, SearchOptions };
