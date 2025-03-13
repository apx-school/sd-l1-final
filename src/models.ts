import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras

type SearchOptions = { title? :string ; tag? :string ; };

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  
  
  
  async getAll(): Promise<Peli[]> {
    try{ 
      const pelis:Peli[] = await jsonfile.readFile("./pelis.json");
      return pelis;
    }catch(error){
      console.error("error al cargar las peliculas",error);
      return [];
    }  
  }

  async getById(id:number): Promise< Peli | null>{
    const pelis = await this.getAll();
    return pelis.find((peli) => peli.id === id) || null;
  }



  async add(peli:Peli) : Promise<boolean> {
      try{
        const peliExistente = await this.getById(peli.id);
        if(peliExistente){
          return false;
        }  
        
        const pelis = await this.getAll();
        pelis.push(peli);
        await jsonfile.writeFile("./pelis.json", pelis);
        return true;   
      }
      
      catch(error){
        console.error("error al agregar pelicula", error);
      }

  }

  async search(options: SearchOptions): Promise <Peli[]>{
    try{
      const lista = await this.getAll();

      const listaFiltrada = lista.filter((peli) => {
        let esteVa = true;

        if (options.tag && !peli.tags.includes(options.tag)) {
          esteVa = false;
        }

        if (options.title && !peli.title.toLowerCase().includes(options.title.toLowerCase())) {
          esteVa = false;
        }

        return esteVa;
    });

    return listaFiltrada;
    
  } catch (error) {
      console.error("error al buscar la pelicula", error);
      return [];
    }
  }
}



export { PelisCollection, Peli, SearchOptions };
