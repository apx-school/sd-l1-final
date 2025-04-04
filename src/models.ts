import * as jsonfile from "jsonfile";
import * as path from 'path';
import _ from "lodash";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

export type SearchOptions = {
  title?: string;
  tag?: string;
};

class listaCompleta{
  lista: Peli[] = [];
  constructor() {
    this.lista = jsonfile.readFile("./src/pelis.json");;
  }
  getLista(): Peli[] {
    return this.lista;
  }
}

class PelisCollection {
  lista: Peli[] = [];

constructor() {
  const listaInstance = new listaCompleta();
   this.lista = listaInstance.getLista();
}

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
        return false;
    }else{
    console.log("peli que se agregará: ", peli);
    const data = await this.getAll();
    data.push(peli);
    this.lista = data;
    try {
        await jsonfile.writeFile("./src/pelis.json", data, { spaces: 2 });
        
        return true;
    } catch (error) {
        console.error("Error al escribir en el archivo:", error);
        return false;
    }}
}

  async getAll(): Promise<Peli[]> {
    try {
        const peliculas: Peli[] = await jsonfile.readFile("./src/pelis.json");
        return peliculas; 
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return []; 
    }
}

  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    const peliEncontrada = pelis.find((peli) => peli.id === id);
    if (peliEncontrada) {
      return peliEncontrada;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    let listaFiltrada = lista;
    if (options.title && !options.tag) {
        listaFiltrada = listaFiltrada.filter(peli =>
            peli.title.toLowerCase().includes(options.title.toLowerCase())
        );
    }
    if (options.tag && !options.title) {
        listaFiltrada = listaFiltrada.filter(peli =>
            peli.tags.includes(options.tag)
        );
    }
    if (options.title && options.tag) {
      listaFiltrada = listaFiltrada.filter((peli) =>
        peli.title.toLowerCase().includes(options.title.toLowerCase()) &&
        peli.tags.includes(options.tag)
      );
    }
    return listaFiltrada;
  } 
}
  

export { PelisCollection, Peli };

