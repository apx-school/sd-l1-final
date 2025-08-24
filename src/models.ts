import * as jsonfile from "jsonfile";

// El siguiente import no se usa pero es necesario
import pelis from '../pelis.json';
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
};
class PelisCollection {
  //Aqui devuleve todas las peliculas de pelis.json
  async getAll(): Promise<Peli[]> {
    const data =  await jsonfile.readFile("./pelis.json");
    return data  
  };

  //Aca busca las pelis por id 
  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    return pelis.find(p => p.id == id) ||null;
  };
  //Aca agrega una nueva pelicula utilizando id y si existe tira error 
  async add(peli: Peli): Promise<boolean> { 
    const existe = await this.getById(peli.id);
    if (existe) { 
      return false;
    }
    const pelis = await this.getAll();
      pelis.push(peli);
      await jsonfile.writeFile("./pelis.json", pelis, {spaces: 2 });
      return true;      
    };
  //Aca busca la peli por titulo y tag y si no coincide la busqueda, no lo trae.
  async search (option: {title?: string; tag?: string}): Promise<Peli[]> {
    const pelicula = await this.getAll();
    return pelicula.filter(p => {
      let coincide = true;
      if (option.title) {
       coincide = coincide && p.title.toLowerCase().includes(option.title.toLowerCase());
      }
      if (option.tag) {
        coincide = coincide && p.tags.some(tag => tag.toLowerCase() === option.tag.toLowerCase());

      }
      return coincide;
    });
  };
}

export { PelisCollection, Peli };
