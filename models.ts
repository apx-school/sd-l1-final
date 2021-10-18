import * as jsonfile from "jsonfile";
import { title } from "process";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((a) => {
      return (a);
    });
  }
  getById(id:number){
   return this.getAll().then((a) => {
       const peliFind = a.find(resultado => {
       return resultado.id == id
      })
      return peliFind
    })
  } 
  search(options:any){
    return this.getAll().then((a) => {
      if ( options.title && options.tags){
        return a.filter((objeto) => {
         return objeto.title.includes(options.title) 
         && objeto.tags.includes(options.tags)
        })
      } else if (options.tags){
        return a.filter((objeto) => {
          objeto.tags.includes(options.tags)
        })
      } else if (options.title){
        return a.filter((objeto) => {
          objeto.title.includes(options.title)
        })
      }
    }) 
  }
  add(peli:Peli): Promise<boolean> {
    const primerPromesa = this.getById(peli.id).then((idPeliRepetido) => {
      if (idPeliRepetido){
        return false;
      } else {
        const data = {}
        const segundaPromesa = this.getAll().then((it) => {
          it.push(peli)
          return jsonfile.writeFile("./pelis.json", data)
        })
        return segundaPromesa.then((resultado) => {
          return resultado = true
        })
      }
    })
    return primerPromesa;
  }  
}

export { PelisCollection, Peli };
