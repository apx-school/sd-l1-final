import * as minimist from "minimist";
import {PelisController} from "./controllers"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  let options:any;
  
 // console.log(params._.length);


  if (params._.length==0) 
  {
    console.log("sin parametros");
    let pelis = await controller.get(null);
    console.log(pelis);
  }

  if (params._[0]==="get"){
    //console.log("voy por get");
    options={
      id:params._[1],
      search:{title:null,tag:null}
    }
    let pelis = await controller.get(options)
    console.log(pelis);
  }

    if (params._[0]==="search"){
      console.log("voy por search");
      options={
        id:null,
        search:{title:params.title, tag: params.tag }

      } 
     // console.log("busco con:",options);
    let pelis = await controller.get(options)
  console.log(pelis);

    }

    if (params._[0]==="add"){
      //console.log("voy por add");
      options={
        id:params.id,
        title:params.title,
        tags: params.tags }
      
    await controller.add(options)
    }

    }

    


main();
