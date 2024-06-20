import * as jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
import "./pelis.json";
import { log } from "console";
import { title } from "process";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];

  constructor(id: number, title: string, tags: string[]) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  // getAll()
  async getAll(): Promise<Peli[]> {
    const pelis = await jsonfile.readFile(__dirname + "/pelis.json");
    return pelis;
  }

  //getById()
  async getById(id: number): Promise<Peli> {
    const pelis = await this.getAll();
    const peli = pelis.find((peli) => {
      return peli.id == id;
    });
    return peli;
  }

  //add

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      return false;
    } else {
      const data = await this.getAll(); // guardando en el array
      data.push(peli);
      await jsonfile.writeFile(__dirname + "/pelis.json", data);

      return true;
    }
  }

  // search title y tag

  async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    const listaFiltrada = lista.filter((peli) => {
      if (options.title && options.tag) {
        return (
          peli.title.toLowerCase().includes(options.title.toLowerCase()) &&
          peli.tags.includes(options.tag)
        );
      } else if (options.title) {
        return peli.title.toLowerCase().includes(options.title.toLowerCase());
      } else if (options.tag) {
        return peli.tags.includes(options.tag);
      } else {
        return true;
      }
    });

    return listaFiltrada;
  }
}

export { PelisCollection, Peli, SearchOptions };

const nuevaCollecion = new PelisCollection();

// getAll()
// (async () => {
//   const pelis = await nuevaCollecion.getAll();
//   console.log(pelis);
// })();

// getById

// (async () => {
//   const pelis = await nuevaCollecion.getAll();
//   const peli = await nuevaCollecion.getById(1);
//   console.table(peli);
// })();

// (async () => {
//   const pelis = await nuevaCollecion.getAll();
//   const peli = await nuevaCollecion.getById(2);
//   console.table(peli);
// })();

// (async () => {
//   const pelis = await nuevaCollecion.getAll();
//   const peli = await nuevaCollecion.getById(3);
//   console.table(peli);
// })();

// add

// const peliNueva = new Peli(4, "Peli 4", ["nueva"]);

// (async () => {
//   const pelis = await nuevaCollecion.getAll();
//   const peliExistente = await nuevaCollecion.getById(4);
//   const peliAgregada = await nuevaCollecion.add(peliNueva);
//   console.table(peliAgregada);
// })();

// (async () => {
//   const pelis = await nuevaCollecion.getAll();
//   const peliExistente = await nuevaCollecion.getById(1);
//   const peliAgregada = await nuevaCollecion.add(peliNueva);
//   console.table(peliAgregada);
// })();

//search por title y tag

// (async () => { 
//   const collection = new PelisCollection();
//   const searchOptions: SearchOptions = { title: "Peli 1" }; // title
//   const result = await collection.search(searchOptions);
//   console.log(result);
// })();

// (async () => {

//   const collection = new PelisCollection();
//   const searchOptions: SearchOptions = { tag: "vieja" }; // tag
//   const result = await collection.search(searchOptions);
//   console.log(result);
// })();

// (async () => {

//   const collection = new PelisCollection();
//   const searchOptions: SearchOptions = {  }; // sin parametros
//   const result = await collection.search(searchOptions);
//   console.log(result);
// })();
