
import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

 class PelisCollection {
 async getAll() {
    return await jsonfile.readFile("./pelis.json");
     
  }
  async getById(id: number ){
    const devolverPorID = await this.getAll();
    return devolverPorID.find((p)=>{
      return p.id == id;
    })
  }


  async search(options:any){
    
    const devolverTodo = await this.getAll();
    
    if (options.title && options.tags){
      const respuesta = devolverTodo.filter((p)=>{
        return (p.title.includes(options.title) && p.tags.includes(options.tag)) 
      })
      return respuesta
    }
  
    else if(options.title){
    const devolverPorTitulo = devolverTodo.filter((p)=>{
      return p.title.includes(options.title)
    })
    return devolverPorTitulo;
  }
  
  else if(options.tags){
    const DevolverPorTags = devolverTodo.find((p)=>{
      return p.tags.includes(options.tags)
    })
    return DevolverPorTags
  }

  
  
  }
  async add(peli: Peli){
    const agregarPeli = await this.getById(peli.id);
    if (agregarPeli){
      return false
    }
    else{
      const peliculas = await this.getAll()
      peliculas.push(peli);
      await jsonfile.writeFile("./pelis.json", peliculas)
      return true
    }
  }
}

export {PelisCollection, Peli}