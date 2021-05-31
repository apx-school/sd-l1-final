import * as jsonfile from "jsonfile";
import * as lodash from "lodash"
import { result } from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  }
  getById(id:number){
    return this.getAll().then((pelis)=>{
      const lista = pelis.find((peli)=>{
        return peli.id == id;
      })
      return lista
    })
  }
  search(option){

if (option.search){
   return this.getAll().then((pelis)=>{
   return  pelis.filter((item)=>{
     return item.title.includes(option.search)
   })
     })
  }else if(option.tag){
    return this.getAll().then((pelis)=>{
      return pelis.filter((item)=>{
     return item.tags.includes(option.tag)
      })
    })
  }

 }
}
export { PelisCollection, Peli };

const prueba = new PelisCollection

prueba.search({search:"u"}).then((item)=>{
  console.log(item)
})


