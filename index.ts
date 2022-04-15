import * as minimist from "minimist";
import {PelisController} from"./controllers"


function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}


function parametrosOptions (controller, params){
  let resultado;
  if(params._.length ==0){
    resultado = controller.get({}).then((res)=>{return res}) };
    if(params._[0]=="get"){
      resultado = controller.get({id:params._[1]}).then((res)=>{return res});
    }
    if(params._[0]=="search"){
      var options={};
      if(params.title)
      options["title"]=params.title;
      if(params.tag)
      options["tag"]=params.tag
      resultado = controller.get({search: options}).then((res)=>{return res})}

    
    if(params._[0]=="add"){
      let ej={
        id:params.id,
        title:params.title,
        tags:params.tags
      }
      resultado=controller.add(ej).then((res)=>{return res})
    }return resultado


}
function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  parametrosOptions(controller, params).then((res)=>{console.log(res)})
}


main();


