import * as jsonfile from "jsonfile";
import * as _ from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
class PelisCollection {
  data: Peli[];
  promise: Promise<any>
  
  getAll():Promise<Peli[]> {
    this.promise = jsonfile.readFile("./pelis.json")
    .then((json =>{
      this.data = json;
      return json
    }));

   return this.promise;
  }

  getById(id){
    const promesaNueva =this.getAll().then(() =>{
       return this.data.find(item => item.id == id)
    })
      return promesaNueva;
    };

    search(options: any): Promise<any> {
      return this.promise.then((obj) => {
        const filtrado = _.filter(obj, (x) => {
          if (options.tag && options.title) {
            return (
              _.includes(x.tags, options.tag) &&
              x.title.toLowerCase().includes(options.title.toLowerCase())
            );
          }
          if (options.title && !options.tag) {
            return x.title.toLowerCase().includes(options.title.toLowerCase());
          }
          if (!options.title && options.tag) {
            return _.includes(x.tags, options.tag);
          }
        });
        return filtrado;
      });
    }
  add(peli:Peli){
    let promesa = this.getAll().then(() =>{
      let encontrado = this.data.find(n => n.id == peli.id);
      if(encontrado == undefined){
        this.data.push(peli);
        jsonfile.writeFile("./pelis.json", this.data);
        return true;
      }else{
        return false;
      }
      
    })
     return promesa;
  }

  
}
export { PelisCollection, Peli };