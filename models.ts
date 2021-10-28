import * as jsonfile from "jsonfile";
import * as lodash from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

  //getAll() devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas
  //en el archivo JSON de pelis.
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      return peliculas;
    });
  }

  //getById(id:number) devuelve la peli que tenga el id que se le pase por parámetro.
  getById(id:number) {
    return this.getAll().then(peliculas => {
       const peliculaBuscada = peliculas.find(pelis => pelis.id == id);
    return peliculaBuscada;   
    });

    
  }
  
  //search(options:any) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
  search(options:any) {
    return this.getAll().then((peliculas) => {
      //si el objeto tiene la propiedad title, el método tiene que devolver todas
      //las películas que tengan ese string en su title.
      if(options.title && options.tag){
        const resultadoTitle = peliculas.filter((pelis) => pelis.title.toLowerCase().includes(options.title.toLowerCase()));
        return resultadoTitle.filter((peli) => peli.tags.find(t => t.toLowerCase() == options.tag.toLowerCase()));
      } else if(options.title){
          const resultadoTitle = peliculas.filter((pelis) => pelis.title.toLowerCase().includes(options.title.toLowerCase()));
            return resultadoTitle;
      } else if (options.tag) {
          //si el objeto tiene la propiedad tag, el método tiene
          //que devolver todas las películas que tengan ese string en sus tags.
          const resultadoTags = peliculas.filter((pelis) => pelis.tags.find(t => t.toLowerCase() == options.tag.toLowerCase()));
            return resultadoTags;
        }
      });
    }
      

    //recibe una Peli y la guarda en el archivo
    add(peli:Peli): Promise<boolean> {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          // magia que agrega la pelicula a un objeto data
            return this.getAll().then((peliculas) => {
            const data = peliculas;
            peliculas.push(peli);
            const promesaDos = jsonfile.writeFile("./pelis.json", data);
            return promesaDos.then(() => {
              return true;
            });
          })
        }
      });
  
      return promesaUno;
    }
    
  }

export { PelisCollection, Peli };
