import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv: any) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();

  switch (params._[0]) {
    case "add":
      const nuevaPelicula = {
        id: params.id,
        title: params.title,
        tags: params.tags,
      };

      controller.add(nuevaPelicula).then((resultado) => {
        console.log(
          resultado ? "Película agregada" : "Error al agregar la película"
        );
      });
      break;

    case "get":
      controller.get({ id: Number(params._[1]) }).then((resultado) => {
        if (resultado.length > 0) {
          console.log("Pelicula encontrada: ", resultado[0]);
        } else {
          console.log("Pelicula no encontrada en la base de datos");
        }
      });

      break;

    case "search":
      
    if(params.title&&params.tag){
        controller.get({search:{title: params.title, tag:params.tag}}).then((resultado)=>{
          if(resultado.length>0){
          console.log(resultado);}
          else{console.log("Titulo no encontado en la base de datos");}
        })
      }
    
    else if(params.title){
        controller.get({search:{title: params.title}}).then((resultado)=>{
          if(resultado.length>0){
          console.log(resultado);}
          else{console.log("Titulo no encontado en la base de datos");}
        })
      }

    
      else if(params.tag){
        controller.get({search:{tag: params.tag}}).then((resultado)=>{
          if(resultado.length>0){
          console.log(resultado);}
          else{console.log("Tag no encontado en la base de datos");}
        })
      }
      break;

    default:
      controller.get().then((resultado)=>console.log(resultado));
      break;
  }
}

main();
