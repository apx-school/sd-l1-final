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

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./src/pelis.json").then((data) => {
      return data;
    });
  }

  getById(id: number): Promise<Peli> {
    return jsonfile.readFile("./src/pelis.json").then((data) => {
      const peli = data.find((peli) => peli.id === id);
      return peli || null;
    })
  }

  add(peli: Peli): Promise<Boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if(peliExistente) { // Verfica que no exista una peli con el mismo id
        return false; 
      } else {
        return this.getAll().then((pelis) => {
          pelis.push(peli); 
          return jsonfile.writeFile("./src/pelis.json", pelis).then(() => { // Agrega la peli al json de pelis
            return true
          })
        })
      }
    })
    return promesaUno;
  }
  async search(options) {
    const pelis = await this.getAll();
    const pelisFiltradas = pelis.filter((peli) => {
      let esteVa = true; 
  
      if (options.tag) {
        esteVa = peli.tags.includes(options.tag);
      }
      if (options.title) {
        esteVa = esteVa && peli.title.includes(options.title); 
      }
      return esteVa; 
    });
    return pelisFiltradas;
  }
  
}
export { PelisCollection, Peli };
