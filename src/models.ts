import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import { error } from "console";
import { promises } from "dns";
import { PelisController } from "./controllers";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propied ades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
};


export type SearchOptions = { 
  title?: string; 
  tag?: string; 
};

 class PelisCollection { 
  private direccion : string

  constructor(filePath: string = "./pelis.json"){
    this.direccion = filePath
  }


  async getAll(): Promise<Peli[]> {
    try {
      return await jsonfile.readFile(this.direccion);
    } catch (error) {
      console.error("Error al leer el archivo: ", error);
      return [];
    }
  }

  async getById(id:number): Promise<Peli | null> {
    const data= await this.getAll()
    return data.find((p)=> p.id ===id) || null;
    }

  async add(peli: Peli): Promise<boolean> {
    const existe = await this.getById(peli.id);
    if (existe) {
      return false; // La película ya existe
    }

    const data = await this.getAll();
    data.push(peli);
    await jsonfile.writeFile(this.direccion, data);
    return true; // Película agregada exitosamente
  }
      
  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
  
    return pelis.filter(peli => {
      const coincTitle = options.title
        ? peli.title.toLowerCase().includes(options.title.toLowerCase())
        : true;
  
      const coincTag = options.tag
        ? peli.tags.includes(options.tag)
        : true;
  
      return coincTitle && coincTag;
    });
  }
}

export{ PelisCollection, Peli };
