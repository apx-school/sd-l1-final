import * as jsonfile from "jsonfile";
import * as _ from "lodash";

class Peli {
  id: number;
  title: string;
  tags: string[];
}
class PelisCollection {
 
  getAll(): Promise<Peli[]> {
    return  jsonfile.readFile("./pelis.json").then((res) =>{return res});
  }

  getById(id:number):Promise<Peli>{
    return this.getAll().then((pelis: Peli[])=>{
     return pelis.find((p)=>p.id ==id)
    });
  }

  search(options:any): Promise<Peli[]>{
    return this.getAll().then((pelis)=> {

      if (options.title && options.tags) {
        console.log("llego a buscar title y tag")

        return pelis.filter((pel) => { 
          pel.title.includes(options.title) && 
          pel.tags.includes(options.tags); });
      } 
      if (options.title) {
        console.log("llego a buscar title")

        return pelis.filter((pel_1) => {
           pel_1.title.includes(options.title); });
      } 
      if (options.tags) {
        console.log("llego a buscar tag",options.tags)
        return _.filter(pelis, function(o){_.includes({pelis},options.tags)})
      }  
    });
  }
  
  add ( peli: Peli): Promise<boolean>{
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.getAll().then((json)=> {
          json.push(peli)
          return jsonfile.writeFile("./pelis.json", json).then((res)=> true);
        })
      };
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };