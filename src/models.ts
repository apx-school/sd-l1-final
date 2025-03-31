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
      //console.log("La película ya existe en el registro.");
        return false;
    }else{
    // Agregar la película al array
    console.log("peli que se agregará: ", peli);
    const data = await this.getAll();
    data.push(peli);
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
        const peliculas: Peli[] = this.lista;
        return peliculas; // Retorna el contenido del archivo directamente
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return []; // Si hay un error, retorna un array vacío
    }
}

  async getById(id: number): Promise<Peli> {
    //console.log(id);
    const pelis = await this.getAll(); // Obtener todas las películas
    const peliEncontrada = pelis.find((peli) => peli.id === id);
    if (peliEncontrada) {
      return peliEncontrada;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    //console.log("Options", options);
    const lista = await this.getAll(); // Obtener todas las películas
    let listaFiltrada = lista;
    // Filtrar por título si se proporciona
    if (options.title && !options.tag) {
        listaFiltrada = listaFiltrada.filter(peli =>
            peli.title.toLowerCase().includes(options.title.toLowerCase())
        );
    }
    // Filtrar por tag si se proporciona
    if (options.tag && !options.title) {
        listaFiltrada = listaFiltrada.filter(peli =>
            peli.tags.includes(options.tag)
        );
    }
    if(options.title && options.tag) {
      //console.log("Options", options);
      let filtraTitle = []
      let filtraTag = []; 
      filtraTitle = listaFiltrada.filter(peli =>
        peli.title.toLowerCase().includes(options.title.toLowerCase())
          );
          filtraTag = listaFiltrada.filter(peli =>
            peli.tags.includes(options.tag)
        );
        listaFiltrada = await _.uniqBy([...filtraTitle, ...filtraTag], 'id');
    }
    //console.log("Resultados esperados:", listaFiltrada); // Debugging
    return listaFiltrada;
  } 
}
  

export { PelisCollection, Peli };


