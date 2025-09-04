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
  listaPelis: Peli[] = [];

  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./src/pelis.json");
  }

  async getById(id: number): Promise<Peli | undefined>{
    const pelis= await this.getAll();
    const peliEncontrada = pelis.find((peli)=> peli.id === id);
    return peliEncontrada;
  }

  async add(peli: Peli): Promise<Boolean>{
    const peliExiste = await this.getById(peli.id);
    if(peliExiste) return false;
    const pelis = await this.getAll();

    pelis.push(peli);

    await jsonfile.writeFile("./src/pelis.json", pelis);
    return true;
  }

  async search(options: SearchOptions): Promise<Peli[]>{
    console.log(options);
    
    const lista = await this.getAll();

    const listaFiltrada = lista.filter((p)=> {
      let esteVa = true;

      if(options.tag){
        esteVa = esteVa && p.tags.includes(options.tag);
      }
      if(options.title){
        esteVa = esteVa && p.title.includes(options.title);
      }
      return esteVa;
    });

    return listaFiltrada;
  }
}
export { PelisCollection, Peli };
