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
      // la respuesta de la promesa
      return peliculas;
    });
  }
  getById(id:number){
    return this.getAll().then((peliculas)=>{
      const resultado = peliculas.find((peli) =>{
        return peli.id == id
      });
      return resultado;
    
    });
  }

  search(options: any){
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((peliculas)=>{
          return peliculas.title.includes(options.title) && peliculas.tags.includes(options.tag);
        });
      
      }
      else if (options.title){
        return peliculas.filter((peliculas)=> {
          return peliculas.title.includes(options.title)
        });
      }
      else if (options.tag) {
        return peliculas.filter((peliculas)=> {
          return peliculas.tags.includes(options.tag);
        });
        
       }

      });

    }

  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        const promesaDos = this.getAll().then((peliculas)=>{
          peliculas.push(peli);
          return jsonfile.writeFile("./pelis.json", peliculas);
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };

