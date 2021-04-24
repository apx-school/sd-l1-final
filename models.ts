import * as jsonfile from "jsonfile";
import * as find from "lodash/find"
import { time } from "node:console";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
};

class PelisCollection {
  
  pelis: Peli [] = [];

  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./peliculas.json")
    promesa.then((json: Peli[]) => {
    this.pelis = json
    });    
    return promesa;
  };
    
  getById(id:number){
    return this.getAll().then((r)=>{
     return find (r,["id",id])
    })
     
  }

  getByTitle(listaDePelis,title:string){
    let pelisEncontradas = []
    listaDePelis.forEach(element => {
      if (element.title.includes(title)){
        pelisEncontradas.push(element)
      };
    });
    return pelisEncontradas;
  };

  getByTags(listaDePelis,tag:string){
    let pelisEncontradasTag = []
  listaDePelis.forEach(element => {
      if (element.tags.includes(tag)){
        pelisEncontradasTag.push(element)
      };
    });
    return pelisEncontradasTag
  };

  search(options:any){
      return this.getAll().then(()=>{
     
      let resultado = []
      
      if (options.title){
         resultado = this.getByTitle(this.pelis,options.title)
      }
      if (options.tag){
        resultado = this.getByTags(this.pelis,options.tag)
      }
      if (options.title && options.tag){
        resultado = this.getByTitle(this.pelis,options.title)
        resultado = this.getByTags(resultado,options.tag)
      }
  
      return resultado; 
      })
  };
  

 add(peli:Peli){
  return this.getAll().then((r)=>{
    let buscaPeli = find (this.pelis,["id", peli.id])
    if (buscaPeli){
      return false
    } else {
    this.pelis.push(peli)
    return jsonfile.writeFile("./peliculas.json", this.pelis).
    then(()=>{
      return true
    })  
     
    } 
  });
}
   
 // fin clase PelisCollection

};

export { PelisCollection, Peli };
