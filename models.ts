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

  getAll() {
    const fileData = jsonfile.readFile("./pelis.json").then((pelis) => {
      // la respuesta de la promesa
      return this.data = pelis;
    });
    return fileData
  }
  getById(id:number){
    return this.getAll().then((pelis)=>{
      const lista = pelis.find((peli)=>{
        return peli.id == id;
      })
      return lista
    })
  }
  search(options: any): Promise<Peli[]> {
    return this.getAll().then((listaPelis) => {
      if (options.title && options.tag){
        return listaPelis.filter((item)=>{
          return item.title.includes(options.title) && item.tags.includes(options.tag);
        });
      }
      if (options.title) {
        return listaPelis.filter((item) => {
          return item.title.includes(options.title);
        });
      }
      if (options.tags) {
        return listaPelis.filter((item) => {
          return item.tags.includes(options.tags);
        });
      }
    });
  }
add(peli: Peli): Promise<boolean> {
  const promesaUno = this.getById(peli.id).then((peliExistente) => {
    if (peliExistente ) {
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






