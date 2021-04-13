import * as jsonfile from "jsonfile";
import * as filtrar from "lodash/filter"


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis :  Peli[]
  getAll() {
    const promesa = jsonfile.readFile("./pelis.json")
     promesa.then((res) => {
      this.pelis = res
      return this.pelis
    });
     return promesa
 }
   getById(id:number){
    return  this.getAll()
    .then( respuesta =>
      respuesta.find((p)=>{
        if(p.id == id){
          return p
        }
      })) 
    } 

    search(options: any) {
      return this.getAll()
      .then((res) => {
         let respuesta = res

         if (options.hasOwnProperty("title")) {
          respuesta = res.filter((p) => p.title.includes(options.title))
         }
         if(options.hasOwnProperty("tag")){
          respuesta = filtrar(respuesta, function(item){return item.tags.includes(options.tag)})
         }
         return respuesta
      });
   }
   add(Peli: Peli) {
      return this.getAll().then((res) => {
         if (
            res.find((p) => {
               return p.id == Peli.id;
            })
         ) {
            return false;
         } else {
            res.push(Peli);
            jsonfile.writeFile("./pelis.json", res).then(() => {
               return true;
            });
         }
      });
   }
}

export { PelisCollection, Peli }
