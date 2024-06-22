import * as jsonfile from "jsonfile";
import "./pelis.json";

type SearchOptions = { 
  title?: string;
  tag?: string
  };

class Peli {
  id: number;
  title: string;
  tags: string[];
  constructor(id:number,title:string,tags:string[]){
    this.id = id
    this.title = title
    this.tags = tags
  }
}

class PelisCollection {

  async getAll(): Promise<Peli[]> {
    const promesa = await jsonfile.readFile("./pelis.json");
    return promesa
  }

  async getById(id:number):Promise<Peli>{
    const promesa = await this.getAll();
    const resultado = promesa.find( (peli) => { return peli.id === id });
  return resultado
  }

  async add(peli:Peli):Promise<boolean>{

    const peliculas = await this.getAll();

    const promesa1 = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente){
        console.log("la pelicula ya se encuentra en la base de datos");
        return false;
      } else {
        peliculas.push(peli);
        console.log("Película agregada correctamente");
        const data = peliculas;
        const promesa2 = jsonfile.writeFile("./pelis.json", data, { spaces: 2 });
        
        return promesa2.then(()=>{
          return true
        });
      }
      });
      return promesa1
   }

  async search(options: SearchOptions): Promise<Peli[]> {
    const peliculas = await this.getAll();
    let peliculasFiltradas: Peli[] = [];

    if (options.title) {
      console.log("El objeto de Search tiene la propiedad titulo");
  
      peliculasFiltradas = peliculas.filter((pelicula) =>
        pelicula.title.toLowerCase().includes(options.title.toLowerCase())
      );
  
      if (peliculasFiltradas.length > 0) {
        return peliculasFiltradas;
      } else {
        console.log("No se encontraron Películas");
      }
      return [];
    }

    if (options.tag) {
    console.log("El objeto de Search tiene la propiedad tag");

    peliculasFiltradas = peliculas.filter((pelicula) => 
      pelicula.tags.some((tag) => tag.toLowerCase().includes(options.tag.toLowerCase()))
    );

    if (peliculasFiltradas.length > 0){
      return peliculasFiltradas
    } else {
      console.log("No se encontraron Etiquetas");
    }
    return peliculasFiltradas;
  }
    
    return peliculas;
  }
}


export { PelisCollection, Peli, SearchOptions};