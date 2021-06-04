import * as jsonfile from "jsonfile";
import * as lodash from "lodash"

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli [] = []

  constructor() {
    this.getAll().then((res)=>{
      return this.pelis = res
    }) 
  }

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return pelis;
    });
  }

  getById(id:number): Promise <Peli> {
    return this.getAll().then((res)=>{return lodash.find(res, (p)=>{
      return p.id == id
    })})
  }

  search(options:any): Promise<Peli[]> {
    let busqueda = this.getAll()

    if (options.title) {
      busqueda =  busqueda.then((res)=>{
        return lodash.filter(res, (p)=>{
          return p.title.includes(options.title)
        })
      })
    } if (options.tag) {
      busqueda =  busqueda.then((res)=>{
        return lodash.filter(res, (p)=>{
          return p.tags.includes(options.tag)
        })
      })
    }

    return busqueda
  }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const data = this.pelis.concat(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", data);

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
