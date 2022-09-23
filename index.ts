import * as minimist from "minimist";
import { PelisController } from "./controllers";
import * as lodash from "lodash"

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

async function procesador(option){
  let controlador = new PelisController;
  if(option._ == 'add'){
    console.log('ADDDDDD')
        return await controlador.add({'id': option.id, 'title': option.title, 'tags': option.tags});
  }
  if(option._[0] == 'get'){
        return controlador.get({id: option._[1]})  
  }
  if(option._[0] == 'search'){
        return controlador.get({
          search: { title: option.title, tag: option.tag },
        })
  }
  if(lodash.isEmpty(option._[0])){
      return controlador.get({falso: 'empty'});
  }
}
function main() {
  const controller = new PelisController;

  const params = parseaParams(process.argv.slice(2))
  
  return procesador(params).then((i)=>{
    console.log(i);
    return i;
  });

}

main();
