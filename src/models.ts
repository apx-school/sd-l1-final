import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta
import _ from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./src/pelis.json");
  }

  async add(peli: Peli): Promise<boolean> {
    const existe = await this.existeId(peli.id);

    if (existe) {
      return false;
    } else {
      const data = await jsonfile.readFile("./src/pelis.json");
      data.push(peli);
      await jsonfile.writeFile("./src/pelis.json", data);
      return true;
    }
  }

  async getById(id: number): Promise<Peli | null> {
    const data = await jsonfile.readFile("./src/pelis.json");
    const peli = data.find((p: Peli) => p.id === id);

    if (peli) {
      return peli;
    } else {
      console.error(`Pelicula con id ${id} no encontrada`);
      return null;
    }
  }

  async search(options) {
    const lista = await this.getAll();

    const listraFiltrada = lista.filter((peli) => {
      let estaVa = true;

      if (options.tag) {
        const peliConTag = _.includes(peli.tags, options.tag);
        if (!peliConTag) {
          estaVa = false;
        }
      }
      if (options.title) {
        const pelisConTitulo = _.includes(
          peli.title.toLocaleLowerCase(),
          options.title.toLocaleLowerCase()
        );
        if (!pelisConTitulo) {
          estaVa = false;
        }
      }
      return estaVa;
    });
    return listraFiltrada;
  }

  async existeId(id: number): Promise<boolean> {
    const data = await jsonfile.readFile("./src/pelis.json");
    const peli = data.find((p: Peli) => p.id === id);
    return peli !== undefined;
  }
}

export { PelisCollection, Peli };
