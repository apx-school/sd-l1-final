import jsonfile from "jsonfile";
import * as path from "path";
// El siguiente import no se usa pero es necesario
const rutaArchivo = "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// Ruta absoluta al archivo pelis.json
const filePath = path.resolve(__dirname, "../pelis.json");


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return jsonfile.readFile("pelis.json")
      .then((data: Peli[]) => {
        return data;
      })
      .catch((error) => {
        console.log("Error al leer el archivo:", error);
        return [];
      })
  }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const promesaDos = jsonfile.readFile(rutaArchivo).then((pelis: Peli[]) => {
          pelis.push({ id: peli.id, title: peli.title, tags: peli.tags });
          return jsonfile.writeFile("./pelis.json", pelis);

        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }


  async getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((data) => {
      const resultado = data.find((busqueda) => busqueda.id === id);
      return resultado;
    }).catch((error) => {
      console.error("Error al obtener la película por ID:", error);
      return undefined;
    });
  }


  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    const listaFiltrada = lista.filter((p) => {
      // Si hay ambos filtros, debe cumplir los dos
      if (options.title && options.tag) {
        return p.title.includes(options.title) && p.tags.includes(options.tag);
      }

      // Si solo hay tag
      if (options.tag) {
        return p.tags.includes(options.tag);
      }

      // Si solo hay title
      if (options.title) {
        return p.title.includes(options.title);
      }

      // Si no hay ni title ni tag
      return false;
    });

    return listaFiltrada;
  }


};



export { PelisCollection, Peli };