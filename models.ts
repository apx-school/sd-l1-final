import * as jsonfile from "jsonfile";


// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data:Peli[]=[];
  async getAll():Promise<any>{
    const json=await jsonfile.readFile("./pelis.json");
    return this.data=json;
  }

  async getById(id: number): Promise<Peli> {
    const listadoDePelis= await this.getAll();
    return listadoDePelis.find((pelis:Peli)=>pelis.id===id);
  }

  async search(options:any):Promise<any>{
    const listadoDePelis= await this.getAll();
    if(options.title&&options.tag){
      return listadoDePelis.filter((peli)=>{
        const filtradasPorTitle=peli.title.includes(options.title);
        const filtradasPorTag=peli.tags.includes(options.tag);
        return filtradasPorTag && filtradasPorTitle;
      });
    }else if(options.title){
      return listadoDePelis.filter((peli)=>peli.title.includes(options.title));
    }else if(options.tag){
      return listadoDePelis.filter((peli)=>peli.tags.includes(options.tag));
    }else{
      return listadoDePelis;
    }
  };

  
  async add(peli:Peli):Promise<boolean>{
    const idEncontrado= await this.getById(peli.id)
    if(idEncontrado){
      return false;
    } 
    const listadoDePelis=await this.getAll();
    listadoDePelis.push(peli);
    await jsonfile.writeFile("./pelis.json",listadoDePelis);
    return true; 
  }

}



export { PelisCollection, Peli };

