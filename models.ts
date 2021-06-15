import { Console } from "console";
import * as jsonfile from "jsonfile";
import { PelisController } from "./controllers";
const filter = require("lodash/filter")
const find = require("lodash/find")
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis:Peli[] = [];
  getAll(): Promise<Peli[]>{//listo
    return jsonfile.readFile("./pelis.json").then((lista) => {
      this.pelis = lista;
      return lista
    });
  }
  getById(id:number){//listo
    return this.getAll().then((lista)=>{
      const encontrado = find(lista,(i)=>{return i.id == id;})
      return encontrado;
    })
  }
  search(options:any):Promise<any>{//listo
    if(options.tag && options.title){
      return this.getAll().then((lista)=>{
        const listaAMostrar = filter(lista,(i)=>{
          return i.title.includes(options.title) && i.tags.includes(options.tag)
        })
        return listaAMostrar;
      });
    }else if(options.title){
      return this.getAll().then((lista)=>{
        const resultado = filter(lista,(i)=>{return i.title.includes(options.title)})
        return resultado;
        });
    }else if(options.tag){
      return this.getAll().then((lista)=>{
        const resultado = filter(lista,(i)=>{return i.tags.includes(options.tag)})
        return resultado;
      });
    }    
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      }else{
        this.pelis.push(peli);
        const lista = this.pelis;
        const promesaDos = jsonfile.writeFile("./pelis.json", lista).then(()=>{
          return true;
        });
        return promesaDos;
      }
    });
    return promesaUno;
  }
}
export { PelisCollection, Peli };