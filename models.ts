import * as jsonfile from "jsonfile";
import * as _ from "lodash"

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  rating: number;
  tags: string[];
  propuesto: string;
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile("pelis.json");
  }
  async getById(id: number) {
    const peliculas = await this.getAll();
    return peliculas.find(x => x.id == id)
  }
  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      const data = await this.getAll();
      data.push(peli);
      await jsonfile.writeFile("./pelis.json", data);
      return true;
    }
  }
  async search(options:any) {
    const baseDePeliculas = await this.getAll();
    var respuesta = [];
    if (options.title) {
      const tituloEncontrado = baseDePeliculas.filter(tituloABuscar => {
        return tituloABuscar.title.toLowerCase().includes(options.title);
      });
      respuesta = tituloEncontrado;
    }
    if (options.tags) {
      const tagsEncontrado = baseDePeliculas.filter(tagsABuscar => {
        return tagsABuscar.tags.includes(options.tags);
      })
      respuesta = _.concat(respuesta, tagsEncontrado);
    }
    return respuesta;
  }
}

export { PelisCollection, Peli };
