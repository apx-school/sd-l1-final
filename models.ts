import * as jsonfile from "jsonfile";
import { INSPECT_MAX_BYTES } from "node:buffer";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = []
  getAll(): Promise<any> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      this.data = peliculas
      return peliculas;
    });
  }
  getById(id:number) {
    return this.getAll().then((peliculas) =>{
      return peliculas.find((item) => item.id == id)
    })
  }
  search(options:any) {
    var resultado;
  if(options.tag && options.title){
    return resultado = this.getAll().then((peliculas) => {
      return peliculas.filter((item)=>
        item.title.includes(options.title) &&
        item.tags.includes(options.tag)
      )
    })
  }else if(options.title){
      return resultado = this.getAll().then((peliculas) => {
        return peliculas.filter((item) => item.title.includes(options.title))
      });
    }else if(options.tag){
      return resultado = this.getAll().then((pelicula) => {
        return pelicula.filter((item) => item.tags.includes(options.tag))
      });
     };
    };
  add(peli:Peli) {
    const promesaUno = this.getById(peli.id).then((pelicula) => {
      if(pelicula){
        return false
      }else{
        this.data.push(peli)
        const promesaDos = jsonfile.writeFile("./pelis.json", this.data);

        return promesaDos.then(() => {
          return true;
        });
      }
    })
      return promesaUno
    }
  
}

export { PelisCollection, Peli };