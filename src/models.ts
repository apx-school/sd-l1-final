import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

const pelisFilePath = __dirname + "/pelis.json";
type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
  rating?: number;
  year?: number;
  country?: string;
  duration?: number;
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile(pelisFilePath);
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      //Si la película ya existe, devuelvo false y la pelicula no se agrega
      return false;
    } else {
      // magia que agrega la pelicula a un objeto data
      const data = await this.getAll();
      data.push(peli);
      try {
        await jsonfile.writeFile(pelisFilePath, data, { spaces: 2 });
        return true;
      } catch (error) {
        console.log("Error al escribir en el archivo: ", error);
        return false;
      }
    }
  }

  async getById(id: number): Promise<Peli> {
    const lista = await this.getAll();
    const encontrado = lista.find((pelicula) => id === pelicula.id);
    return encontrado;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p) => {
      let esteVa = false;

      if (options.tag && !options.title) {
        // En caso de que tenga sólo tag
        // si pasa cambio "esteVa" a true
        const tagEncontrado = p.tags.some(
          (tag) => tag.toLowerCase() === options.tag.toLowerCase()
        );
        if (tagEncontrado) {
          esteVa = true;
        }
      }
      if (options.title && !options.tag) {
        // En caso de que tenga sólo title
        // si pasa cambio "esteVa" a true

        const titleEncontrado = p.title
          .toLowerCase()
          .includes(options.title.toLowerCase());
        if (titleEncontrado) {
          esteVa = true;
        }
      }

      if (options.title && options.tag) {
        //En caso de que tenga ambos
        const tagEncontrado = p.tags.some(
          (tag) => tag.toLowerCase() === options.tag.toLowerCase()
        );
        const titleEncontrado = p.title
          .toLowerCase()
          .includes(options.title.toLowerCase());
        if (titleEncontrado && tagEncontrado) {
          esteVa = true;
        }
      }

      return esteVa;
    });

    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
