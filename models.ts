import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[];
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
   search(options:any):Promise<any>{
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
   add(peli:Peli): Promise<boolean>{
     const promesaUno = this.getById(peli.id).then((peliExistente)=>{
      console.log(peli)
      if(peliExistente){
        return false;
      }else{
        this.peliculas.push(peli);
        const data = this.peliculas;
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(()=>{
          return true;
        });
      }
    });
    return promesaUno;
   }
}
export { PelisCollection, Peli };

