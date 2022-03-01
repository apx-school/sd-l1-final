import * as minimist from "minimist";
import {PelisController} from './controllers';
import {Peli} from './models';

function parseaParams(argv) {
  const argumentos = minimist(argv);
  const peliControll = new PelisController();
  const elParametroEsAdd =argumentos._[0]=="add"; 
  const elParametroEsGet = argumentos._[0]=="get"; 
  const elParametroEsSearch = argumentos._[0]=="search";

  if (elParametroEsAdd){
    const peliNueva = new Peli();
    peliNueva.id = argumentos.id;
    peliNueva.title = argumentos.title ;
    peliNueva.tags = argumentos.tags;
    return  peliControll.add(peliNueva);
  }
  if(elParametroEsGet){
    const obj = {id:argumentos._[1]}
    return peliControll.get(obj);
  }
  if(elParametroEsSearch){
    const obj = { search: {title:argumentos.title , tag: argumentos.tag } };
    return peliControll.get(obj);
  }else{
    return peliControll.get('');
  }

}

function main() {
  const params = parseaParams(process.argv.slice(2));
  params.then(r=> console.log(r));
}

main();
