import * as minimist from "minimist";
import { PelisCollection } from "./models";
import {PelisController} from "./controllers"

function parseaParams(argv) {                                         
  const resultado = minimist(argv);
  
  
  return resultado
}

function parametros (controller ,objeto){
var resultado;

  if (objeto._[0]=="get"){                                              
    return resultado = controller.get({id:objeto._[1]}).then((res)=>{ 
    return res                                                       
  })
 }
 if (objeto._[0]=="search"){                                           
  
  if(objeto.title && objeto.tags){                                      
    return resultado = controller.get({search:{title:objeto.title,tags:objeto.tags}}).then((res)=>{
      return res
    })                                              
      
  } 
}
  if(objeto.tags){                                                       
    return resultado = controller.get({search:{tags:objeto.tags}}).then((res)=>{
      return res
    })
  }
  if(objeto.title){                                                      
    return resultado = controller.get({search:{title:objeto.title}}).then((res)=>{
      return res
    })
    }
  if (objeto._[0]=="add"){
    return resultado = controller.add({id:objeto.id,title:objeto.title,tags:objeto.tags}).then((res)=>{
      return res
    })
    
  }
  return resultado
  }

  
  
 





function main() {
  const params = parseaParams(process.argv.slice(2));
  const controles = new PelisController
  parametros(controles , params).then((res)=>{
    console.log(res)
  })
 


 }
main();
