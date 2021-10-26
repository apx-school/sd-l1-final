import * as jsonfile from "jsonfile";

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
       const peliculaBuscada = peliculas.find(pelis =>{
         return pelis.id == id;
       })
    return peliculaBuscada;   
    });

    
  }
  
  //search(options:any) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
  search(options:any) {

    //si el objeto tiene la propiedad title, el método tiene que devolver todas
    //las películas que tengan ese string en su title.
    if(options.title){
      return this.getAll().then(peliculas => {
        const resultadoTitle = peliculas.filter(pelis => {
          return pelis.title.includes(options.title);
        })
        return resultadoTitle;
        })
      } else if(options.tag){
        //si el objeto tiene la propiedad tag, el método tiene
        //que devolver todas las películas que tengan ese string en sus tags.
        return this.getAll().then(peliculas => {
          const resultadoTags = peliculas.filter(pelis => {
             return pelis.tags.find(t => t == options.tag);
          })
          return resultadoTags;
        })
      };
    }
      

    //recibe una Peli y la guarda en el archivo
    add(peli:Peli): Promise<boolean> {
      const promesaUno = this.getById(peli.id).then((peliExistente) => {
        if (peliExistente) {
          return false;
        } else {
          // magia que agrega la pelicula a un objeto data
          const data = peli;
          const promesaDos = jsonfile.writeFile("./pelis.json", data);
          return promesaDos.then(() => {
            return true;
          });
        }
      });
  
      return promesaUno;
    }
    
  }


export { PelisCollection, Peli };
