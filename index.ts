import * as mini from "minimist";
import {PelisController} from "./controllers"
import * as _ from "lodash";


function parseaParams(argv) {
  return  mini(argv);
}

function processOptions(params) {
  const controller = new PelisController();

 if (params._[0] == "add") {
    return controller
      .add({ title: params.title, 
        tags: params.tag,
        id: params.id })
      .then((res) => res);
    }

  if (params._[0] == "get") {
  
    return controller.get({ id: params._[1] }).then((res) => res);
 }


  if (params._[0] == "search" && params.title && params.tag) {
  
    return controller
      .get({ search: { title: params.title, tag: params.tag } })
      .then((res) => res);
  }


  if (params._[0] == "search" && params.title) {

    return controller
      .get({ search: { title: params.title } })
      .then((res) => res);
  }

   if (params._[0] == "search" && params.tag) {
   
    return controller.get({ search: { tag: params.tag } }).then((res) => res);
  }
  
  if (_.isEmpty(params._[0])) {
   
    return controller.get({empty:{argv:"vacia"}}).then((res)=>res);
   
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  return processOptions(params).then((res) => console.log(res));
  
};
 
main();
