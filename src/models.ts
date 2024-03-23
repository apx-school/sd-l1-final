import * as jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie.
// en la app no usamos esto para acceder al archivo porque es dinámico.
import "./pelis.json";

//Declaracion de tipo nuevo (Opciones de busqueda).
type SearchOptions = { title?: string; tag?: string };

// no modificar estas propiedades, agregar todas las que quieras.
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(noLog?: boolean): Promise<Peli[]> {
    //Leer pelis.json
    const pelis = jsonfile.readFile("./pelis.json").then((res) => {
      // la respuesta de la promesa.
      return res;
    });

    //Resultado de busqueda
    const resultado = pelis.then((res) => {
      //Mostrar resultado
      if (!noLog) {
        console.log("LISTA COMPLETA DE PELICULAS...");
        console.table(res);
        console.log("\n");
      }

      return res;
    });

    return pelis;
  }

  //Funcion para agregar peli.
  add(peli: Peli): Promise<boolean> {
    //Guardar argumento peli en un objeto.
    const objetoPeli = {
      id: peli.id,
      title: peli.title,
      tags: peli.tags,
    };

    //Llamar a getById y pasar el id de la pelicula del argumento.
    const buscarCoincidencia = this.getById(peli.id).then((res) => {
      //Si hay coincidencia devuelve true.
      if (res) {
        return true;

        //Si no, false.
      } else {
        return false;
      }
    });

    //Resultado de la busqueda guardado en una variable.
    const result = buscarCoincidencia.then((res) => {
      //si no hay Id duplicado, guardar peli.
      if (res == false) {
        this.getAll(true).then((pelis) => {
          pelis.push(objetoPeli);
          jsonfile.writeFile("./pelis.json", pelis);
          console.log("Pelicula guardada con exito!");
        });
        //Si lo hay, imprimir error.
      } else {
        console.log("Error al guardar pelicula: Id duplicado");
      }
      //Devolver true o false, dependiendo el resultado.
      return res;
    });

    //Devolver true o false, del resultado de la promesa que busca coincidencia.
    return result;
  }

  //Funcion para buscar por id.
  getById(id: number): Promise<Peli> {
    //Almacena la busqueda en una variable.
    const busqueda = jsonfile.readFile("./pelis.json").then((res) => {
      //Recorrer elementos del resultado.
      for (let p = 0; p < res.length; p++) {
        //Chequear coincidencias de Id entre los id's de los elementos iterados.
        //y el id del argumento de esta funcion.
        if (res[p].id == id) {
          //Si hay coincidencia, devuelve el item respectivo, sino, devuelve undefined.
          return res[p];
        }
      }
    });

    //Resultado de la busqueda.
    const resultado = busqueda.then((response) => {
      //Si la respuesta es undefined.
      if (response === undefined) {
        console.log(
          "El Id proporcionado no pertenece a ninguna pelicula y esta disponible para su uso."
        );
        console.log("\n");
      }

      //Si la respuesta es un objeto.
      else if (response != undefined) {
        //Imprime la pelicula cuyo id coincide si es que la hay.
        console.log("BUSQUEDA POR ID...");
        console.log("El Id proporcionado pertenece a la siguiente pelicula:");
        console.table([response]);
        console.log("\n");
      }

      //Devolver respuesta.
      return response;
    });

    //Devuelve la peli encontrada.
    return resultado;
  }

  //Buscar por titulo o tag.
  async search(options: SearchOptions): Promise<Peli[]> {
    //Usando for loop.----------------------------------------------------
    //Lista de resultados
    let resultsList = [];
    //Realizar busqueda.
    const busqueda = jsonfile.readFile("./pelis.json").then((res) => {
      //Comprobar tipo de busqueda ---------------

      //POR TITULO
      if (options.title && !options.tag) {
        console.log("BUSQUEDA POR TITULO...");
        console.log(
          `Estos resultados coinciden con tu busqueda: ("${options.title}")`
        );
        //Busqueda por title.
        for (let p = 0; p < res.length; p++) {
          //Comparar titulos buscando que elemento contiene el valor title.
          if (res[p].title.includes(options.title)) {
            //Si algun elemento contiene el title, agregar a lista.
            resultsList.push(res[p]);
          }
        }
      }
      //POR TAG
      else if (options.tag && !options.title) {
        console.log("BUSQUEDA POR TAG...");
        console.log(
          `Estos resultados coinciden con tu busqueda: ("${options.tag}")`
        );
        //Iterar peliculas y guardar tags.
        for (let p = 0; p < res.length; p++) {
          //Guardar los tags del elemento iterado en una variable.
          let tags = res[p].tags;

          //Busqueda por tag iterando res[tags[]].
          for (let t = 0; t < tags.length; t++) {
            //Comparar titulos buscando que elemento contiene el valor tag.
            if (tags[t].includes(options.tag)) {
              //Si algun elemento contiene el tag, agregar a lista.
              resultsList.push(res[p]);
            }
          }
        }
      }
      //POR TITULO Y TAG
      else if (options.tag && options.title) {
        console.log("BUSQUEDA POR TITULO Y TAG...");
        console.log(
          `Estos resultados coinciden con tu busqueda: (TITULO:"${options.title} TAG:${options.tag}")`
        );
        //Iterar peliculas.
        for (let p = 0; p < res.length; p++) {
          //Busqueda por title.
          //Comparar titulos buscando que elemento contiene el valor title.
          if (res[p].title.includes(options.title)) {
            //Si algun elemento contiene el title, agregar a lista.
            resultsList.push(res[p]);
          }
          //Guardar los tags del elemento iterado en una variable.
          let tags = res[p].tags;

          //Busqueda por tag iterando res[tags[]].
          for (let t = 0; t < tags.length; t++) {
            //Comparar titulos buscando que elemento contiene el valor tag.
            if (tags[t].includes(options.tag)) {
              //Si algun elemento contiene el tag, agregar a lista.
              resultsList.push(res[p]);
            }
          }
        }
      }

      //Imprimir resultados si hay al menos 1 "uno".
      if (resultsList.length > 0) {
        //Funcion para eliminar duplicados que genera la busqueda por titulo y tag
        function removeDuplicates(lista) {
          return lista.filter((item, index) => lista.indexOf(item) === index);
        }

        //Mostrar resultados
        console.table(removeDuplicates(resultsList));
        console.log("\n");
      }

      return res;
    });

    return busqueda; //Retorno de modo for loop.
  }
}
export { PelisCollection, Peli };
