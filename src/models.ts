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

export type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  dataPeliculas: Peli[] = [];
  async getAll(): Promise<Peli[]> {
    try {
        const peliculas: Peli[] = await jsonfile.readFile("./pelis.json");
        return peliculas;
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return []; // Si hay un error, retorna un array vacío
    }
}
  async add(peli: Peli): Promise<boolean> {
    const promersaUno = this.getById(peli.id).then((peliExistente) => {
    if (peliExistente) {
      return false;
    } else{
      const data = {...peli};
      const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          return true;
      });  
      }
  });
    return promersaUno;
  }  
  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll(); // Obtener todas las películas
    const peliEncontrada = pelis.find((peli) => peli.id == id);

    if (!peliEncontrada) {
        console.log("No existe esa película en los registros");
    }
    
    return peliEncontrada;
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    this.getAll();
    
    const listaFiltrada = this.dataPeliculas.filter(function (p) {
      let esteVa = false;
       // lógica de tags
      if (options.tag) {
        const tagsDelTituloActual = p["tags"];
        tagsDelTituloActual.forEach((tag) => {tag == options.tag ? esteVa = true : null});
      }
        // lógica de title
      if (options.title) {
        const tituloActual = p["title"];
        tituloActual.forEach((title) => {title == options.title ? esteVa = true: null});
      }
      return esteVa;
    });
  
    return listaFiltrada;
  }
  }
  

export { PelisCollection, Peli };


