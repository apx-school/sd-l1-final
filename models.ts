import * as jsonfile from "jsonfile";
import { resourceUsage } from "process";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<any[]> {
    return jsonfile.readFile("./pelis.json").then((arrayDePelis) => {
      return arrayDePelis;
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
    return this.getAll().then((pelis)=>{
      var resultado = pelis;
      if(options.title){
           resultado = resultado.filter((p)=>{
            return p.title.includes(options.title);  
          });
      }
      if(options.tag){
        resultado = resultado.filter((p)=>{
          return p.tags.includes(options.tag);
        });
      }
     return resultado;
    });
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

