import * as jsonfile from "jsonfile";
import * as lodash from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const todasLasPelis = jsonfile.readFile("./pelis.json");
    return todasLasPelis;
   
  }
  async getById(id:number){
    const pelis =  await this.getAll()
    const resultado = await lodash.find(pelis, function(i){return i.id === id})
    return resultado;
  }
  async search(options:any){
    if(options.title && options.tag){
      const pelis = await this.getAll();
      const buscarTitle = await lodash.filter(pelis, function(i){return (i.title).toLowerCase().includes(options.title)});
      const resultado = await buscarTitle.filter((peli)=> peli.tags.find(tag => tag == options.tag)) 
      return resultado
    }

    else if(options.title){
      const pelis =  await this.getAll();
      const resultado = await lodash.filter(pelis, function(i){return (i.title).toLowerCase().includes(options.title)})
      return resultado;
    }
    else if(options.tag){
      const pelis =  await this.getAll();
      const resultado = await lodash.filter(pelis, function(i){return i.tags.includes(options.tag)})
      return resultado;
    }
  }
  async add(peli:Peli){
    const pelis = await this.getAll();
    const repetido =  this.getById(peli.id)
    if(await repetido){
      return false
    }
    else{
      const data = pelis;
      data.push(peli);
      const resultado = await jsonfile.writeFile("./pelis.json",data);
      return resultado
    }

  }
}
export { PelisCollection, Peli };
