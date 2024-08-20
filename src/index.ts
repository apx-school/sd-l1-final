import { PelisController } from "./controllers";
import minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  // console.log(params);
  if (params._[0] === "add") {
      // Si se pasa la opción "add", se agrega una película
      const newPeli = {
          id: params.id,
          title: params.title,
          tags: params.tags.split(',') // Convierte los tags en un array
      };
      controller.add(newPeli);
      console.log(`Película añadida: ${newPeli.title}`);
  } else if (params._[0] === "get") {

    const id = Number(params._[1]);

    if (!isNaN(id)) {

        const pelicula = controller.get({ id });

        pelicula.then((res) => console.log('Resultado de búsqueda:', res))

            .catch(err => console.error("Error al obtener la película:", err));

    } else {

        console.log("Ingrese un ID válido");

    }

} else if (params._[0] === "search"){
    const prueba2 = {
      search: {title:params.title,tag:params.tag}};
    const pelicula = controller.get(prueba2)
    pelicula.then((res) => console.log('Resultado de búsqueda:' , res))
  } else if (params._[0] == undefined){
    controller.peliculas.getAll().then(res => console.log(res))
  } 
  else {
          console.log('Película no encontrada.');
      }
}


main();
