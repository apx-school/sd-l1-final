import * as jsonfile from "jsonfile";
import { OPENSSL_VERSION_NUMBER } from "node:constants";
//import { PelisController } from "./controllers";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peli:Peli[]=[]
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((jsonPelis) => {
      // la respuesta de la promesa
      return this.peli =  jsonPelis;
    });
  }
  getById(id:number):Promise<Peli>{
    //console.log(id)
    return this.getAll().then((peliculas)=>{
      const respuesta = peliculas.find((item)=>{
        return item.id == id
    })
    return respuesta
    })   
  }
  search(options:any):Promise<any>{
    return this.getAll().then((peliculas)=>{
      let peliEcontrada =  peliculas
      if(options.title){
        peliEcontrada = peliEcontrada.filter((item)=>{
          return item.title.includes(options.title)
        })
      }
      if(options.tag){
        peliEcontrada = peliEcontrada.filter((item)=>{
          return item.tags.includes(options.tag)
        })        
      }
      if(options.title && options.tag){
        peliEcontrada = peliEcontrada.filter((item)=>{
          return item.title.includes(options.title) &&
          item.tags.includes(options.tag)
        })
      }
      return peliEcontrada
    })
  }
  add(pelicula: Peli):Promise<boolean>{
    const promesaUno = this.getById(pelicula.id)
      .then((peliExistente)=>{
        if(peliExistente){
          return false
        }else{
          this.peli.push(pelicula)
          const segundaPromesa = jsonfile.writeFile("./pelis.json", this.peli)
          return segundaPromesa.then(()=>{
            return true})
        }
      })
    return promesaUno
  };
}
export { PelisCollection, Peli };
