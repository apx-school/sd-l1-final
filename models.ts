import { readFile, writeFile } from "jsonfile";
import * as _ from "lodash";

// usar loadash recomendacion

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
    const idEncontrado = _.find(pelis, ["id", id]);
    return idEncontrado;
  }
}

// const pelicula = {
//   id: 7,
//   title: "elementos",
//   tags: ["suspenso", "novedad", "favorita"],
// };
// console.log(pelicula)

// const mariano = new PelisCollection();
// const result = mariano.add(pelicula)
// console.log(result)
// result.then(res => console.log(res))
// mariano.getAll().then(res => console.log(res))
// mariano.getById(3).then(res => console.log(res))
// mariano.add(pelicula).then((res) => console.log(res));

export { PelisCollection, Peli };
