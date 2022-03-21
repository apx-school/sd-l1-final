import * as minimist from "minimist";
import {PelisController} from './controllers';
import {Peli} from './models';

function parseaParams(argv) {
  const args = minimist(argv);

  const peliController = new PelisController();
  const paramAdd =args._[0]=="add"; 
  const paramGet = args._[0]=="get"; 
  const paramSeach = args._[0]=="search";

  if (paramAdd){
    const newPeli = new Peli();
    newPeli.id = args.id;
    newPeli.title = args.title ;
    newPeli.tags = args.tags;
    return  peliController.add(newPeli);
  }
  if(paramGet){
    const obj = {id:args._[1]}
    return peliController.get(obj);
  }
  if(paramSeach){
    const obj = { search: {title:args.title , tag: args.tag } };
    return peliController.get(obj);
  }else{
    return peliController.get('');
  }

}

function main() {
  const params = parseaParams(process.argv.slice(2));
  params.then(r=> console.log(r));
}

main();
