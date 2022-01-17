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
  
 getById(id:number) {
   return this.getAll().then ((peliculas) =>{
     const resultado = peliculas.find(p => {
       return p.id == id;
     });
     return resultado;
   });

 }

  search(options: any) {
    return this.getAll().then((peliculas) => {
      if (options.title) {
        const resultado = peliculas.find((pelis) => {
          return pelis.title.includes(options.title);
        })
        return resultado;
      }
      else if (options.tags) {
        const resultado = peliculas.find(pelis => {
          return pelis.tags == options.tags;
        });
        return resultado;
      }
    });

  };

  addPeli(peli:Peli):Promise<boolean> {
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


