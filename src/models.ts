import * as jsonfile from "jsonfile";

// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta
export  type SearchOptions = { title?: string; tag?: string };
// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis:Peli[] = [];

  constructor(){
    //console.log("entro a constructor");
  }

  getAll(): Promise<Peli[]> {
    const pelisAll = jsonfile.readFile(__dirname + "/pelis.json").then((data) => {
      this.pelis = data;      
      return data;
    }).catch((error) => {
      console.error("Error al leer el archivo JSON:", error);
    });
    return Promise.resolve(pelisAll);  
  };

  getById(id:number):Promise<Peli | null>{   
    const peliPromise = this.getAll().then((data)=>{      
      const pelicula = data.find((p)=>p.id === id);
      return pelicula;  
    });
    return Promise.resolve(peliPromise || null);   
  }
  
  search(options:SearchOptions):Promise<Peli[]>{    
    const busqueda = this.getAll().then((data)=>{
      if(options.title != null && options.tag == null)
        {
          return data.filter((d)=>d.title.includes(options.title)) 
        }
        else if(options.title != null && options.tag != null)
        {
          return data.filter((d)=>d.title.includes(options.title) && d.tags.some((x)=>x.includes(options.tag)));
        }
    });
    return Promise.resolve(busqueda);
  }

  add(peli: Peli): Promise<Peli | false> {    
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {             
        return this.getAll().then((data)=>{
          //if (Array.isArray(data)) {
            data.push(peli); // Agregar la nueva película al array
            this.pelis = data;
            // Escribir el contenido actualizado en el archivo
            return jsonfile.writeFile(__dirname + "/pelis.json", data, { spaces: 2 }).then(() => {
              return true;
            });
          /*} else {
            throw new Error("El archivo JSON no contiene un array.");
          }*/
        });        
      }
    });
  
    return Promise.resolve(promesaUno || false);
  }
}
export { PelisCollection, Peli };
