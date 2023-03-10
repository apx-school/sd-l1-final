import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const pullJson= await jsonfile.readFile("./pelis.json");
    return pullJson;
   };
   async getById(id:number):Promise<Peli>{
    const listado= await this.getAll()
    const idBuscado=await listado.find((pelis)=>{
     return pelis.id===id
    })
    return idBuscado;
   }
   async add(peli:Peli):Promise<boolean> {
    const idPeli=await this.getById(peli.id);
    if(idPeli){
      return false;
    }
    const listadoDePelis= await this.getAll();
    listadoDePelis.push(peli);
    await jsonfile.writeFile("./pelis.json",peli);
    return true;
   };

   async search(options:any):Promise<any>{
    const listadoDePelis= await this.getAll();
    if(options.title){
      return listadoDePelis.filter((pelis)=>{
        return pelis.title.includes(options.title) 
      });
    }else if(options.tags){
      return listadoDePelis.filter((pelis)=>{
        return pelis.tags.includes(options.tags)
      });
    }else if(options.title && options.tags){
      return listadoDePelis.filter((pelis)=>{
        const filtradasPorTitle=pelis.title.includes(options.title);
        const filtradasPorTags= pelis.tags.includes(options.tags);
        return filtradasPorTags && filtradasPorTitle;
      });
    }else{
      return listadoDePelis;
    }
   };



  }



export { PelisCollection, Peli };

