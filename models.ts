import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  peliculas: Peli[] = [];

  //Me habia olvidado de crear el constructor, por eso no me funcionaba el test
  constructor() {
    this.getAll().then((peliculasJson) => {
      this.peliculas = peliculasJson;
    });
  }

  getAll() {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      //cuando la promesa se resuelva, osea cuando termine(then)
      //entonces retorno peliculas que es lo que devuelve readFile
      return peliculas;
    });
  }

  getById(id: number) {
    //obtengo todas las pelis de this
    return this.getAll().then((peliculas) => {
      //busco la peli con find de las peliculas que devolvio el json
      const resultado = peliculas.find((peli) => {
        if (peli.id == id) {
          return true;
        }
      });
      //retorno la peli que encontre
      return resultado;
    });
  }

  search(options: any) {
    //cuando la promesa se resolvio, voy a realizar las busquedas y a devolver resultados
    return this.getAll().then((peliculas) => {
      //CON TITULO MAS TAGS
      if (options.title && options.tag) {
        var pelisConTags = peliculas.filter((peli) => {
          //busco en el array de tags de la peli con find
          return peli.tags.find((tag) => {
            if (options.tag == tag) {
              return true;
            }
          });
        });
        var resultado = pelisConTags.filter((peli) => {
          //si alguna de las pelis incluye options.title la devuelvo
          return peli.title.includes(options.title);
        });
        return resultado;
      } else {
        //SOLO CON TAGS
        if (options.tag) {
          //busco los tags de las pelis con filter
          return peliculas.filter((peli) => {
            //busco en el array de tags de la peli con find
            return peli.tags.find((tag) => {
              if (options.tag == tag) {
                return true;
              }
            });
          });
        } else {
          //SOLO CON TITULO
          if (options.title) {
            //busco las pelis con filter
            return peliculas.filter((peli) => {
              //si alguna de las pelis incluye options.title la devuelvo

              if (peli.title.includes(options.title)) {
                return peli;
              }
            });
          }
        }
      }
    });
  }

  add(peli: Peli) {
    //primero me fijo si el id de la "peli nueva" ya existe o no
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      //si ya existe entonce retorno false porque no tengo que agregarla
      if (peliExistente) {
        return false;
      } else {
        //sino existe, agrego la nuevaPeli al array peliculas
        //luego lo sobreescribo en el json
        //las pelis ya estan cargadas porque hice el this.getById que
        //a su vez llama al getall y ahi se cargan en this

        this.peliculas.push(peli);

        const promesaDos = jsonfile.writeFile("./pelis.json", this.peliculas);

        //si la promesa termino de escribir el json, retorno true
        //porque se pudo guardar la peli
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    //por ultimo retorno promesaUno que sera true o false
    return promesaUno;
  }
}

export { PelisCollection, Peli };
