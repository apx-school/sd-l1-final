import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[]=[]

  async getAll(): Promise<Peli[]> {
    const json = await jsonfile.readFile("./pelis.json");
    this.data  = json
    return json;
  }
  async getById(id: number): Promise<Peli> {
    const json = await this.getAll();
    const resultado = json.find( el => { return (el.id == id)});
    return resultado;
  }
  
  async search(options: any) {
    const json = await this.getAll();
    
    if (options.title && options.tag) {
      return json.filter( element => {
        const resultTitle = element.title.includes(options.title)
        const resultTag   = element.tags.includes(options.tag)
        return resultTitle && resultTag})
      }
    if (options.title) {
      return json.filter( element => {return element.title.includes(options.title)})
    }
    if (options.tag) {
      return json.filter( element => {
        return element.tags.includes(options.tag)})
    }
  }

  async add(peli:Peli): Promise<Boolean> {
    this.getAll()
    const promesa1 = await this.getById(peli.id)
    if (promesa1 == undefined){
      this.data.push(peli)
      const promesa2 =jsonfile.writeFile("./pelis.json",this.data)
      return promesa2.then(()=>{return true})
    }else{
      return false
    }
    
  }
}


export { PelisCollection, Peli };


