import { readFile, writeFile } from "jsonfile";
import * as _ from "lodash";
import {peliPorTag,peliPorTitulo,peliPorTagDos} from "./milibreria"

// usar loadash recomendacion
type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  // pelis:Peli[]
  // constructor(){
  //   this.getAll().then(pelis => this.pelis = pelis)
  // }

  // a este metodo lo van a ir llamando todos para pasarse la promesa
  async getAll(): Promise<Peli[]> {
    return await readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }
  async add(peli: Peli): Promise<boolean> {
    const peliBuscadaPorId = await this.getById(peli.id);
    if (!peliBuscadaPorId) {
      const peliculas = await this.getAll();
      peliculas.push(peli);
      const estadoDeLaCarga = await writeFile("./pelis.json", peliculas).then(()=> {
        return true;
      })
      return estadoDeLaCarga
    } else {
      return false;
    }
  }

  async getById(id: number) {
    const pelis = await this.getAll();
    const peliPorId = _.find(pelis, ["id", id]);
    return peliPorId;
  }

  async search(options):Promise<Peli[]>{ 
    if(!options){
      return await this.getAll()
    }
    if(options.title){
      // const pelis = await this.getAll()
      // return pelis.filter((peli) => peli.title === options.title);
      return peliPorTitulo(options.title)
      
    } else if(options.tag){
      return peliPorTag(options.tag)
      
  }

}

}

// const pelicula = {
//   id: 127,
//   title: "dfsddsdfsf",
//   tags: ["suspenso", "novedad", "favorita"],
// };
// // console.log(pelicula)
// const peli = {
//   id: 127,
// title: "sfsf",
//   tag: "drama"
// }
// const mariano = new PelisCollection();
// mariano.add(pelicula).then(res => console.log(res))
// mariano.search(peli).then(res => console.log(res))
// console.log(peliEncontrada)
// const result = mariano.add(pelicula)
// console.log(result)
// result.then(res => console.log(res))
// mariano.getAll().then(res => console.log(res))
// mariano.getById(3).then(res => console.log(res))
// mariano.add(pelicula).then((res) => console.log(res));

export { PelisCollection, Peli };
