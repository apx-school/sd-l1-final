import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  //  resultado = {
  //   id?: number;
  //   search?: {
  //     title?: string;
  //     tag?: string;
  //   };
  // };

  // const peticionGet =  {
  //   id: params.id,
  //   search: {
  //     title: params.title,
  //     tag: params.tags
  //   }
  // };
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  

  const controller = new PelisController()
  // console.log(params);
  // console.log(params._[0]);
  // console.log(params.title);
  if(!params._[0]){
    controller.get({}).then(res => console.log(res))
  }else if(params._[0] == "add"){
    const peticion = {
      id: params.id,
      title: params.title,
      tags: params.tags
    }
    controller.add(peticion).then(res => console.log(res))
    
  }else if(params._[0][0] == "get"){
    
    controller.get(params).then(res => console.log(res))
    
  }else if(params._[0] == "search"){
    if(params.title && params.tag){
      controller.get({search:{title:params.title}}).then(res => console.log(res))
      controller.get({search:{tag:params.tag}}).then(res => console.log(res));

    }else if(params.title){

      controller.get({search:{title:params.title}}).then(res => console.log(res))
    }else if(params.tag){
      controller.get({search:{tag:params.tag}}).then(res => console.log(res));
    }
  }

  

}

main();
