import * as jsonfile from "jsonfile";
import * as path from "path";
// El siguiente import no se usa pero es necesario
import "../pelis.json";
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

// 🔑 Ruta absoluta al JSON (funciona desde la raíz)
const filePath = path.join(__dirname, "../pelis.json");

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const promesaUno = await jsonfile.readFile(filePath);
    // la respuesta de la promesa
    return promesaUno;
  }

  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    const peliEncontrada = pelis.find((p) => p.id === id);

    return peliEncontrada;
  }

  async add(peli: Peli): Promise<boolean> {
    try {
      const peliExistente = await this.getById(peli.id);
      if (peliExistente) {
        return false;
      }

      const todasLasPelis = await this.getAll();

      todasLasPelis.push(peli);
      await jsonfile.writeFile(filePath, todasLasPelis);

      return true;
    } catch (error) {
      console.error("error al guardar la peli", error);
      return false;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((peli) => {
      let coincide = true;

      // Si me pasaron un title, verifico que esté en el título
      if (options.title) {
        // pasamos todo a minúsculas para que no dependa de mayúsculas
        coincide =
          coincide &&
          peli.title.toLowerCase().includes(options.title.toLowerCase());
      }

      // Si me pasaron un tag, verifico que esté en la lista de tags
      if (options.tag) {
        coincide = coincide && peli.tags.includes(options.tag);
      }

      return coincide;
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli };
