import * as jsonfile from "jsonfile";
import { formatWithOptions } from "util";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peli) => {
      // la respuesta de la promesa
      return peli;
    });
  }
  getById(id:number) {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((title)=> {
       return title.id == id;
      });
      return resultado;
    });
  }
  search(options:any)  {
    if (options.title && options.tag){
      return this.getAll().then((i) => {
        return i.filter((t) => {
          return t.title.includes(options.title) && t.tags.includes(options.tag);
        });
      });
    } else if (options.title){
      return this.getAll().then((i) => {
        return i.filter((t) => {
          return t.title.includes(options.title);
        });
      });
    } else if (options.tag){
      return this.getAll().then((i) => {
        return i.filter((t) => {
          return t.tags.includes(options.tag);
        });
      });
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data
        //const data = {}; 
        const promesaDos = this.getAll().then((peliculas) => {
          peliculas.push(peli);
          return jsonfile.writeFile("./pelis.json", peliculas);
        })
        return promesaDos.then(() => {
          
          return true;
        });
      
      }
      
    });

    return promesaUno;
  }
}

/*const objeto = new PelisCollection();
objeto.search("t").then((resultado) => {
  console.log(resultado);
})*/




export { PelisCollection, Peli };
