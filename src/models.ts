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
  async getAll(): Promise<Peli[]> {
    return await jsonfile
      .readFile("./src/pelis.json")
      .then((res: Peli[]) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getById(id: number): Promise<Peli> {
    return (await this.getAll()).find((el) => el.id === id);
  }

  async add(peli: Peli): Promise<boolean> {
    const data = await jsonfile.readFile("./src/pelis.json");
    const pelis = Array.isArray(data) ? data : [];
    const peliExistente = pelis.find((p) => p.id === peli.id);
    if (peliExistente) {
      return false;
    } else {
      pelis.push(peli);
      const promesaDos = jsonfile.writeFile("./src/pelis.json", pelis);
      return promesaDos.then(() => {
        return true;
      });
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    const listaFiltrada = lista.filter((p) => {
      let esteVa = true;
      if (options.tag && !p.tags.includes(options.tag)) {
        esteVa = false;
      }
      if (
        options.title &&
        !p.title.toLowerCase().includes(options.title.toLowerCase())
      ) {
        esteVa = false;
      }
      return esteVa;
    });
    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
