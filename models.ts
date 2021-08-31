import * as jsonfile from "jsonfile";
const baseDeDatos = "./pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  //peliculas: Peli[] = [];

  /*getAll() devuelve un array del tipo Peli con todas las pelis que se encuentren guardadas 
 en el archivo JSON de pelis. */
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(baseDeDatos).then((pelis) => {
      // la respuesta de la promesa
      return pelis;
    });
  }

  /*
  getById(id:number) devuelve la peli que tenga el id que se le pase por parámetro.
  */
  getById(id: number) {
    return this.getAll().then((peliculas) => {
      const peli = peliculas.find((i) => {
        return i.id == id;
      });
      return peli;
    });
  }

  //search(options:any) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
  search(options: any) {
    /*si el objeto tiene la propiedad title {title: "ejemplo" }, el método tiene que devolver todas las 
    películas que tengan ese string en su title. (Por ejemplo si search es "a" debe devolver todas
    las películas que tengan la letra "a" en su title.)
    */
    /*
    si el objeto tiene la propiedad tag, el método tiene que devolver todas las películas que tengan 
    ese string en sus tags. (Por ejemplo si tags es "classic" debe devolver todas las películas 
    que tengan el tag "classic".)
    */
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((i) => {
          return (
            i.title.includes(options.title) && i.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return peliculas.filter((i) => {
          return i.title.includes(options.title);
        });
      } else if (options.tag) {
        return peliculas.filter((i) => {
          return i.tags.includes(options.tag);
        });
      }
    });
  }

  /*
  add(peli:Peli) recibe una Peli y la guarda en el archivo. 
  -Tiene que devolver un boolean que indique si se agregó correctamente la peli. 
  
  -No debe admitir agregar IDs repetidos. 
  -O sea que, si no pudo guardar el dato en el archivo por algún error de escritura o por que el id 
  está duplicado, debe devolver false.

  Tener en cuenta que acá seguramente hayan dos promesas encadenadas. Una para chequear si la peli
   existe y otra para crear la peli en el archivo. 

   Para resolver ese problema tener en cuenta el siguiente patrón:
  */

  add(peli: Peli): Promise<boolean> {
    //No debe admitir agregar IDs repetidos.
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // magia que agrega la pelicula a un objeto data

        const promesaDos = this.getAll().then((peliculas) => {
          peliculas.push(peli); //Le agrego la peli a this.peliculas
          return jsonfile.writeFile(baseDeDatos, peliculas); //Cargo this.peliculas a la BD
        });

        return promesaDos.then(() => {
          return true;
        });
      }
    });
    //-Tiene que devolver un boolean que indique si se agregó correctamente la peli.
    //false: no se cargó. Ya existe
    //true: se cargó. No existia
    return promesaUno;
  }
}

export { PelisCollection, Peli };

// const objeto = new PelisCollection();

// const consola = objeto
//   .add({ id: 1, title: "Hola", tags: ["comedia"] })
//   .then((i) => {
//     console.log(i);
//   });
// //console.log(consola);
