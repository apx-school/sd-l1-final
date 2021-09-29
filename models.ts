import * as jsonfile from "jsonfile";
import { resourceUsage } from "process";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any[]> {
    return jsonfile.readFile("./pelis.json").then((respuesta) => {
      return respuesta;
    });
  }
  getById(id:number): Promise<Peli>{
      return this.getAll().then((pelisId)=>{
        return pelisId.find((peli)=>{
          return peli.id == id;
        });
      })
  }
  search(options:any): Promise<Peli[]>{
    if(options.title){
      return this.getAll().then((pelis)=>{
        const resultado = pelis.filter((pelis)=>{
          return pelis.title.toLocaleLowerCase().includes(options.title);  
        });
        return resultado;
      });
    }
    if(options.tag){
      return this.getAll().then((pelis)=>{
        const resultado = pelis.filter((pelis)=>{
          return pelis.tags.toLocaleString().includes(options.tag);
        });
        return resultado;
      });
    }
  }
  add(peli:Peli):Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      if(peliExistente){
        return false;
      }else{
        const promesaDos = this.getAll().then((pelisNuevas)=>{
          pelisNuevas.push(peli);
          return jsonfile.writeFile("./pelis.json", pelisNuevas)
        });
        return promesaDos.then(()=>{
          return true;
        })
      }
    })
    return promesaUno;
  }
}
export { PelisCollection, Peli };

