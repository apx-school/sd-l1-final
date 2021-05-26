import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[]=[];
  getAll(): Promise<Peli[]> {
    const promise = jsonfile.readFile("./pelis.json").then((json) => {
      return this.data = json;
    });
    return promise
  }
  getById(id:number):Promise<Peli>{
    return this.getAll().then((movie)=>{
      const result = movie.find((mov)=>{
        return mov.id == id;
      });
      return result;
    });
  }
  search(options:any){
    const promise = this.getAll().then((arrayMovs)=>{
      if (options){ 
        const findMov =  arrayMovs.filter((m)=>{
          return ( m.title.includes(options)|| m.title.toLocaleLowerCase().includes(options))
        });        
      return findMov;
      }
    })

    return promise;
  }
}

export{PelisCollection,Peli}

/*const object = new PelisCollection();
object.getById(14223).then((resultado)=>{
  console.log(resultado);
})*/


