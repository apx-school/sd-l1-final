import * as mini from "minimist";
import {PelisController} from "./controllers"
import * as _ from "lodash";
import { Cipher } from "crypto";

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
    console.log("entro en getiD")
    return controller.get({ id: params._[1] }).then((res) => res);
 }


  if (params._[0] == "search" && params.title && params.tag) {
    console.log("entro en search.title y tag")
    return controller
      .get({ search: { title: params.title, tag: params.tag } })
      .then((res) => res);
  }


  if (params._[0] == "search" && params.title) {
    console.log("entro en search.title")
    return controller
      .get({ search: { title: params.title } })
      .then((res) => res);
  }

   if (params._[0] == "search" && params.tag) {
     console.log("entro en search.tag")
    return controller.get({ search: { tag: params.tag } }).then((res) => res);
  }
  
  if (_.isEmpty(params._[0])) {
    console.log("entro en empty")
    return controller.get({empty:{argv:"vacia"}}).then((res)=>res);
   
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  return processOptions(params).then((res) => console.log(res));
  
};
 
main();
