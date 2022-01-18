import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      
      return peliculas;
    });
  };
  
 getById(id:number):Promise<any> {
   return this.getAll().then ((peliculas) =>{
     const resultado = peliculas.find(p => {
       return p.id == id;
     });
     return resultado;
   });

 }


  search(options: any): Promise<any> {
    return this.getAll().then((peliculas) => {
      return peliculas.filter((pelicula) => {
        if (options.title && options.tag) {
          return (
            pelicula.title.includes(options.title) &&
            pelicula.tags.includes(options.tag)
          );
        } else if (options.title) {
          return pelicula.title.includes(options.title);
        } else if (options.tag) {
          return pelicula.tags.includes(options.tag);
        }
      });
    });
  }


  add(peli:Peli):Promise<boolean> {
   const promesauno = this.getById(peli.id).then ((encontrada) => {
      if (encontrada) {
      return false;
    }
      else {
        return this.getAll().then((peliculas)=> {
            peliculas.push(peli);
            return jsonfile.writeFile("./pelis.json", peliculas).then (() => {
              return true;
        });

      });
    }
   });
   return promesauno;
  }
}



export { PelisCollection, Peli };


