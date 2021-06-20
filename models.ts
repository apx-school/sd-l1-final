import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
   peliculas: Peli[];
   
   getAll(): Promise<Peli[]> {
     const todasLasPelis = jsonfile.readFile("./pelis.json").then((pelis) => {
       this.peliculas = pelis
       return pelis;
      });
      return todasLasPelis;
    }
    
    getById(id:number): Promise<any> {
      return this.getAll().then((peliculas) => {
        const resultado = peliculas.find((peli) => {
          return peli.id == id;
        });
        return resultado;
      });
    }
    
    search(options:any){
      if(options.title && options.tag) {
        return this.getAll().then((peliculas) => {
          return peliculas.filter((item) => {
            return item.title.includes(options.title) && item.tags.includes(options.tag);
          });
        });
      } else if(options.title){
        return this.getAll().then((peliculas) => {
          return peliculas.filter((item) => {
            return item.title.includes(options.title);
          });
        });
      } else if(options.tag) {
        return this.getAll().then((peliculas) => {
          return peliculas.filter((item) => {
            return item.tags.includes(options.tag);
          });
        });
      }
    }
    
    add(peli: Peli): any{
      return this.getById(peli.id).then((idRepetido) => {
        if (idRepetido) {
          return false;
        } else {
          return this.getAll().then((lista) => {
            lista.push(peli);
            console.log("Peli agregada!");
            return jsonfile.writeFile("./pelis.json", lista).then(() => {})
          });
        } 
      });
    }
  }
  
export { Peli, PelisCollection };
