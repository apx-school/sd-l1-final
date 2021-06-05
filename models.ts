import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((p) => {
      // la respuesta de la promesa

      return p;
    });
  }
   getById(id:number){
     return this.getAll().then((peli)=>{
       const res = peli.find((p)=>{
         return p.id == id;
       });
       return res;
     });
   }
   search(options:any){
  if(options.title){
    return this.getAll().then((pelis)=>{
      const letter = pelis.filter((p)=>{
        return p.title.includes(options.title);
      });
      return letter;
    });
  }
  if(options.tags){
    return this.getAll().then((pelis)=>{
      const tagFinder = pelis.filter((p)=>{
        return p.tags.includes(options.tags)
      });
      return tagFinder;
    });
  }
   }
   add(peli:Peli){
     
   }
}
export { PelisCollection, Peli };

const obj = new PelisCollection();
obj.search({title:"Harry Potter y la piedra filosofal"}).then((r)=>{
  console.log(r)
})