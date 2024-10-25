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
    return jsonfile.readFile("./src/pelis.json").then((r: Peli[]) => {
      return r
    })
    .catch((error) => {
      console.error("Error al leer el archivo", error);
      throw error;
    });
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = null;
        data.push(peliExistente)
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
  getById(id:number):Promise<Peli>{
    return jsonfile.readFile("./src/pelis.json").then((r: Peli[]) => {
      const peliculaID = r.find(c => c.id == id);
      return peliculaID;
    })
  }

  async search(options:SearchOptions):Promise<Peli[]>{
    const lista = await this.getAll();

    const listaFiltrada = lista.filter(function (p) {
      let esteVa = false;
      if (options.tag) {
        if (p.tags.some(tag => tag.toLocaleLowerCase() === options.tag.toLocaleLowerCase())){
          esteVa = true;
        } 
      }
      if (options.title) {
        let palabras = options.title.split(' ');
        if (palabras.some(palabra => p.title.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()))){
          esteVa = true;
        }
      };
      return esteVa;
    });
  return listaFiltrada;
  }
}
export { PelisCollection, Peli };
