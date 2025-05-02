import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import { error } from "console";
import { promises } from "dns";
import { PelisController } from "./controllers";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { 
  title?: string; 
  tag?: string; 
};


class PelisCollection { 
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data: Peli[]) => {
      return data;
    }) .catch((error)=>{
      console.error("Error al leer el archivo: ", error);
      return[];
    }) ;
  };
  getById(id:number): Promise<Peli | null> {
    return jsonfile.readFile("./pelis.json").then((data:Peli[ ])=> {
      const PeliEncontrada= data.find(peli => peli.id=== id);
  return PeliEncontrada || null;
    }).catch((error)=>{
      console.error("Error al leer el archivo: ",error)
      return null;
    })
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {  
      if(peliExistente){
        return false;
      }  else {
        const promesaDos = jsonfile.writeFile("./pelis.json").then((data:Peli[]) =>{
          data.push(peli)
          return jsonfile.writeFile("./pelis.son",  data).then(() =>{
            return true
          });
        });
      }
    });
      return promesaUno;
};
search(options: SearchOptions): Promise<Peli[]> {
  return jsonfile.readFile("./pelis.json").then((data:Peli[])=> {
    const listaFiltrada = data.filter(peli => {
      let coincide = true;
      if (options.title) {
        coincide = coincide && peli.title.includes(options.title)
      }
      if (options.tag) { 
        coincide = coincide && peli.tags.includes(options.tag)
      }
      return coincide
    });
    return listaFiltrada;
  }).catch((error)=> {
    console.error("Error al leer el archivo", error)
    return [];
  })
}}

export{ PelisCollection, Peli };
