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
    try{
      const data = await jsonfile.readFile("./src/pelis.json");
      return data;
    }catch (error){
      if(error instanceof SyntaxError){
        console.error("Archivo vacio o incorrecto");
        return [];
      }
      throw error;
    }
     
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id)
      if (peliExistente) {
        return false;
      } else {
        const data = await this.getAll();
        data.push(peli)
        await jsonfile.writeFile("./src/pelis.json", data);
        return true;
        };
      }
    

  async getById(id:number):Promise<Peli | null>{
    const r = await this.getAll();
    const peliculaID =  r.find(c => c.id === id);
    return peliculaID || null;
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
  
    const listaFiltrada = lista.filter((p) => {
      let esteVa = true;
  
      if (options.tag) {
        esteVa = esteVa && p.tags.map((tag) => tag.toLowerCase()).includes(options.tag.toLowerCase());
      }
      if (options.title) {
        esteVa = esteVa && p.title.toLowerCase().includes(options.title.toLowerCase());
      }
      return esteVa;
    });
    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
