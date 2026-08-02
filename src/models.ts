import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import { title } from "process";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
  constructor(id:number,title: string, tags:string []){
    this.id= id;
    this.title=title;
    this.tags=tags;

  }

}

type SearchOptions = { title?: string; tag?: string };



class PelisCollection {
 async getAll(): Promise<Peli[]> {
    const lectura = await jsonfile.readFile("./src/pelis.json")
      return lectura;
  }


async getById(id:number):Promise<Peli>{
  const result = await this.getAll().then((i)=>{
    return i.find(rev => rev.id == id)})
if (!result) {
    throw new Error(`Peli con id ${id} no encontrada`);
  }
  return result; 
}


async search(options:SearchOptions):Promise<Peli[]>{
  const base = await this.getAll();
 if(options.title && options.tag){
  
  const result = base.filter((dato)=> dato.title.includes(options.title || "") && dato.tags.includes(options.tag || ""));
 return result;

 }
  if(options.title){
    const result = base.filter((dato)=> dato.title.includes(options.title || ""));
    return result;
  } 
  else if(options.tag){
    const result =[]
    for(let rev1 of base){
      for(let rev2 of rev1.tags){
        if(options.tag == rev2){
          result.push(rev1)
        } 
      }
    }
    return result;
  }
  
  return[]; 
  }


  async add(peli: Peli): Promise<boolean> {
  try{
    const promesaUno =await this.getById(peli.id)
    if(promesaUno){
      return false;
    }
    
}catch{     
    
      const data = await this.getAll();

      data.push(peli);

      const promesaDos = jsonfile.writeFile("./src/pelis.json", data);


      return promesaDos.then(() => {
        return true;
      });}
      return false;
    }
  }


export{Peli,PelisCollection, SearchOptions}




  

