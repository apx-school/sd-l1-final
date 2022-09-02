import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  
  async getAll(): Promise<Peli[]> {
    return await jsonfile.readFile("./pelis.json");
  }
  async getById(id:number):Promise<Peli>{
    let datos = await this.getAll()
    return datos.find(el=>{
      return el.id === id
    })
  }
  async search(options:any) :Promise<any>{
    let pelis = await this.getAll();
    let title = options.title
    let tag = options.tag
    if (options.title && options.tag) {
      return pelis.filter(el=>{
      return el.title.includes(title) && el.tags.includes(tag)
     })
    } else if (options.title) {
      return pelis.filter((titlepeli) => {
        return titlepeli.title.includes(options.title)
      });
    }else if (options.tag) {
      return pelis.filter((tagPeli) => {
        return tagPeli.tags.includes(options.tag)
      });
    }
  
  }
  async add(pelicula:Peli):Promise<boolean>{
    let pelisExistente = await this.getById(pelicula.id)
    if(pelisExistente){
      return false
    }
    let datos = await this.getAll()
    datos.push(pelicula)
    await jsonfile.writeFile("pelis.json",datos)
    return true
      
    
  }
}
export { PelisCollection, Peli };

