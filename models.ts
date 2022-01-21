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
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      //cuando la promesa se resuelva, osea cuando termine(then)
      //entonces retorno peliculas que es lo que devuelve readFile
      return peliculas;
    });
  }

  getById(id: number): Promise<Peli> {
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

  search(options: any): Promise<Peli[]> {
    //cuando la promesa se resolvio, voy a realizar las busquedas y a devolver resultados
    return this.getAll().then((peliculas) => {
      //CON TITULO MAS TAGS
      if (options.title && options.tag) {
        var tituloFiltrado = peliculas.filter((peli) => {
          //si alguna de las pelis incluye options.title la devuelvo
          if (peli.title.toLowerCase().includes(options.title.toLowerCase())) {
            return peli;
          }
        });

        return tituloFiltrado.filter((peli) => {
          //busco en el array de tags de las peli que ya filtre por titulo con find
          const encontrado = peli.tags.find((tag) => {
            if (options.tag == tag) {
              return true;
            }
          });
          //si el tag se encontro dentro de los tags de la peli, devuelvo la peli
          if (encontrado == options.tag) {
            return peli;
          }
        });
      }
      //SOLO CON TITULO
      else if (options.title) {
        //busco las pelis con filter
        return peliculas.filter((peli) => {
          //si alguna de las pelis incluye options.title la devuelvo
          if (peli.title.toLowerCase().includes(options.title.toLowerCase())) {
            return peli;
          }
        });
      }
      //SOLO CON TAGS
      else if (options.tag) {
        //busco los tags de las pelis con filter
        return peliculas.filter((peli) => {
          //busco en el array de tags de la peli con find
          const encontrado = peli.tags.find((tag) => {
            if (options.tag == tag) {
              return true;
            }
          });
          //si el tag se encontro dentro de los tags de la peli, devuelvo la peli
          if (encontrado == options.tag) {
            return peli;
          }
        });
      }
    });
  }

  add(peli: Peli): Promise<boolean> {
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

/*
function main() {
  const pelis = new PelisCollection();
  pelis.getAll().then((resultado) => {
    //lo que resolvio getAll es resultado y son las pelis del json
    //despues esas pelis se las asigno a peliculas de mi objeto pelis
    //todo lo que resuelva getAll lo tengo que poner dentro del then
    //porque si lo pongo afuera no a funcionar ya que se ejecutan antes
    //de lo que esta dentro del then
    pelis.peliculas = resultado;
    console.log(pelis.peliculas);
  });
  
  var pelisEncontadas;

  pelis.search({ title: "ave" }).then((pelis) => {
    pelisEncontadas = pelis;
    console.log(pelisEncontadas);
  });
  pelis.search({ tag: "Comedia" }).then((pelis) => {
    pelisEncontadas = pelis;
    console.log(pelisEncontadas);
  });
  
  pelis
    .add({
      id: 13,
      title: "Naruto Shippuden",
      tags: ["Accion", "Shonen", "Aventura"],
    })
    .then((sePudo) => {
      console.log(sePudo);
      pelis.getAll().then((pelis) => {
        console.log(pelis);
      });
      pelis.getById(13).then((peli) => {
        var peliEncontrada = peli;
        console.log(peliEncontrada);
      });
    });
}

main();
*/

export { PelisCollection, Peli };
