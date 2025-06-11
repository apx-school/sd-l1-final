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
  tag: string[];
};

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  };

 async getById(id:number) {
  const peliculas = await this.getAll();
  return peliculas.find((pel) => pel.id === id) || null;
 };

  async add(peli:Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    }
    try {
      const data = await jsonfile.readFile("./pelis.json");
      data.push(peli);
      await jsonfile.writeFile("./pelis.json",data);
      return true;
    } catch (error) {
      console.error("No se pudo agregar la pelicula:", error);
      return false;
    }
  };
  async search(options:SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();

    const listaFiltrada = lista.filter(peli => {
      let esteVa = true;
        if (options.tag) {
          esteVa = peli.tag.includes(options.tag);
      }
      if (options.title) {
        esteVa = esteVa && peli.title.includes(options.title);
      }
      return esteVa;
    });
    return listaFiltrada
};
}

export { PelisCollection, Peli };