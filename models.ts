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
  data:Peli[]=[]

  getAll(): Promise<Peli[]> {
    const fileData = jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
    return
  }
  getById(id:number): Promise<Peli[]>{
    return this.getAll().then((pelis)=>{
      const lista = pelis.find((peli)=>{
        return peli.id == id;
      })
      return lista
    })
  }
  search(option){

if (option.title){
   return this.getAll().then((pelis)=>{
   return  pelis.filter((item)=>{
     return item.title.includes(option.title)
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
add(peli: Peli): Promise<boolean> {
  const promesaUno = this.getById(peli.id).then((peliExistente) => {
    if (peliExistente) {
      return false;
    } else {
      // magia que agrega la pelicula a un objeto data
      this.data.push(peli)
      const promesaDos = jsonfile.writeFile("./pelis.json",this.data);

      return promesaDos.then(() => {
        return true;
      });
    }
  });

  return promesaUno;
} 
}
export { PelisCollection, Peli };

const prueba = new PelisCollection()





