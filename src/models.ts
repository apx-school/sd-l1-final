import {find,filter,includes,startsWith}  from "lodash"
import  jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = { title?: string; tag?: string };


class PelisCollection {
  constructor(){
    this.pelis=[]
  }
  pelis:Peli[]
  async getAll(): Promise<Peli[]> {
  try {
    const data = await jsonfile.readFile("./src/pelis.json");
    return data; // devolvés el array de pelis
  } catch (error) {
    console.error("Error leyendo pelis.json:", error);
    return []; // devolvés un array vacío en caso de error
  }
    
  }
  async getById(id:number):Promise<Peli>{
    const data= await jsonfile.readFile("./src/pelis.json")
    return find(data, (o)=> { return o.id ===id; });
    

  }
 
   add(peli: Peli): Promise<boolean> {
   
  const promesaUno = this.getById(peli.id).then(async (peliExistente) => {
    if (peliExistente) {
      return false; // Si ya existe, no se agrega
    } else {
       const data= await jsonfile.readFile("./src/pelis.json")
       data.push(peli)
      this.pelis=data // Agregamos la peli a la colección
      try {
        await jsonfile.writeFile("./src/pelis.json", this.pelis); // Esperamos a que se escriba
     
      return true
      } catch (error) {
        return false; // Si hubo un error al escribir
      }
    }
  });

  return promesaUno;
}
async  search(options) {
  const lista = await this.getAll();

  const listraFiltrada = lista.filter(function (p) {
    let esteVa = true;
    if (options.tag) {
  esteVa = esteVa && p.tags.some(tag => tag.toLowerCase() === options.tag.toLowerCase());
      
      

    }
    if (options.title) {
      
     esteVa = esteVa && p.title.toLowerCase().includes(options.title.toLowerCase());
  
    }
    return esteVa;
  });

  return listraFiltrada;
}
}

export { PelisCollection, Peli };
