import minimist from "minimist";
import * as models from "./models";
import * as controllers from "./controllers";

//Declaracion de tipo nuevo (Opciones de busqueda).
type SearchOptions = { title?: string; tag?: string };

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));

  //Pelis & PelisCollection
  let peli = new models.Peli();
  peli.id = 3;
  peli.title = "SonComoNiños";
  peli.tags = ["comedia", "familiar"];

  //Clase PelisCollection de "models"
  const collection = new models.PelisCollection();

  //Clase PelisController de "controllers"
  const controller = new controllers.PelisController();

  //Metodos de models (Descomentar y probar)--------------------
  //Mostrar todas las peliculas
  //collection.getAll();
  //Mostrar parametros
  //console.log(params);
  //Agregar peli
  //collection.add(peli);
  //Buscar por ID
  //collection.getById(4);
  //Buscar por titulo o tag
  //collection.search({ tag: "accion" });
  //collection.search({ title: "Tran" });

  //Metodos de controller (Descomentar y probar)------------------
  // controller.get({ id: 2 });
  // controller.get({ search: { title: "T" } });
  // controller.get({ search: { tag: "aventura" } });
  // controller.get({ search: { title: "M", tag: "ave" } });
  // controller.get();

  //Argumentos por consola (Descomentar y probar)-----------------
  //Chequear si hay argumentos
  if (params) {
    //Almacenar comando y argumentos extras.
    const comando = params["_"][0];
    console.log(comando);

    const id = params["id"];
    const title = params["title"];
    const tags = params["tags"];

    //Addpeli (Guardar una pelicula)
    if (comando == "add") {
      //Crear peli
      let peliParaGuardar = new models.Peli();
      //Posar argumentos de la consola
      peliParaGuardar.id = id;
      peliParaGuardar.title = title;
      peliParaGuardar.tags = tags;

      collection.add(peliParaGuardar);
    }

    //getById (Buscar pelicula por Id)
    else if (comando == "get") {
      //Extraer numero del comando usando Stringify y una Regex
      let idNumber = JSON.stringify(params).match(/(\d+)/)[0];

      //Buscar pelicula
      controller.get({ id: Number(idNumber) });
    }

    //search (Buscar pelicula)
    else if (comando == "search") {
      //Buscar pelicula
      controller.get({ search: { title: title, tag: tags } });
    }

    //Si no hay parametros, mostrar lista completa de peliculas
    else {
      controller.get();
    }
  }
}

main();
