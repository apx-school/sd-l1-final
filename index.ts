import * as minimist from "minimist";
import {PelisController} from './controllers';
import {Peli} from './models';

function parseaParams(argv) {
  const peliControll = new PelisController();
  const args = minimist(argv);
  const parameter = args._[0]; 

switch (parameter){

  case "add":
  const peliNueva = new Peli();
  peliNueva.id = args.id;
  peliNueva.title = args.title ;
  peliNueva.tags = args.tags;
  return peliControll.add(peliNueva);

  case "get":
    var obj = {id:args._[1]}
    return peliControll.get(obj);

  case "search":
    var objeto = { search: {title:args.title , tag: args.tag } };
    return peliControll.get(objeto);

  default:
    return peliControll.get('')
  } 
  

}
function main() {
  const params = parseaParams(process.argv.slice(2));
  params.then(r=> console.log(r));
}

main();