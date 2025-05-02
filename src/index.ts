import minimist from "minimist";
import { PelisController } from './controllers'

type Peli = {
  id: number; // ID de la película
  title: string; // Título de la película
  tags: string[]; // Array de tags
};

function parseaParams(argv: string[]) {
  const resultado = minimist(argv);
  
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisController = new PelisController()
  const command = params._[0]

switch ( command){
  case 'add':
  const id = params.id
  const title = params.title
  const tags = params.tags
  if (id && title && tags){
    const resultado = await pelisController.add(id,title,tags)
    console.log(resultado? "Pelicula Agregada." : "No se pudo agregar la Pelicula.")
} else {
  console.log("Faltan agregar parametros para la pelicula")
} break;

case 'get':
  const peliId = params._[1];
  if (peliId){
    const pelicula= await pelisController.getOne({ id: Number(peliId)})
 console.log (pelicula? pelicula : "Pelicula no encontrada") 
  }else {
    console.log("Falta el ID de la Pelicula.");
  } break;

  case 'search':
    const searchOptions : {title?:string,tag?:string}= {}
    if (params.title) searchOptions.title = params.title
    if ( params.tag) searchOptions.tag = params.tag
    const peliculas = await pelisController.search(searchOptions)
    console.log(peliculas.length > 0 ? peliculas : "No se encontraron peliculas")
    break;


    default: 
    const todasLasPeliculas = await pelisController.getAllPelis()
    console.log(todasLasPeliculas)
    break
} 

  console.log(params);
}

main();
