import * as jsonfile from "jsonfile";
import * as filtrar from "lodash/filter"
import * as find from "lodash/find"


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
   add(peli: Peli): Promise<any> {
      return this.getAll().then((json) => {
        let repeatedId = find(json,function(item) {return item.id === peli.id});
        if(!repeatedId){
          json.push(peli)
          return jsonfile.writeFile("./pelis.json", json).then(() => true);
        } else {
          console.log("Error, pelicula ya agregada");
          return false;
        }
      })
  }
}

export { PelisCollection, Peli }
