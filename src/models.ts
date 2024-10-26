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
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./src/pelis.json");
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id)
      if (peliExistente) {
        return false;
      } else {
        const data = await this.getAll();
        data.push(peli)
        await jsonfile.writeFile("./pelis.json", data);
        return true;
        };
      }
    

  async getById(id:number):Promise<Peli | null>{
    const r = await this.getAll();
    return r.find(c => c.id === id) || null;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
  
    return lista.filter(p => {
      let esteVa = true;
  
      if (options.tag) {
        esteVa = esteVa && p.tags.some(tag => tag.toLowerCase() === options.tag.toLowerCase());
      }
  
      if (options.title) {
        const palabras = options.title.split(' ');
        esteVa = esteVa && palabras.some(palabra => p.title.toLowerCase().includes(palabra.toLowerCase()));
      }
  
      return esteVa;
    });
  }
}
export { PelisCollection, Peli };
