import * as minimist from "minimist";
import {Peli} from './models'
import {PelisController} from './controllers'

async function parseaParams(argv) {
  const argumentos = minimist(argv.slice(2)); 
  const {_,...options} = argumentos;
  const optionsKeys = Object.keys(options);
  var results: any;
  var action: string = argumentos._[0];

  if(action == "add"){
    const requiredKeys = ["id","title","rating","tags"];
    if(requiredKeys.every(e => optionsKeys.includes(e))) {
      results = {add:options};
      results.add.tags = results.add.tags.substring(2,results.add.tags.length-2).split('","');
    }else{
      throw Error('Los argumentos ingresados son incorrectos');
    }
  }else if(action == "get" && optionsKeys.includes("id")){
    results = {id: options.id};
  } else if(action == "search"){
    results = {search:{}};
    if(optionsKeys.includes("title")) results.search.title = options.title;
    if(optionsKeys.includes("tag")) results.search.tag = options.tag;;
  } else if(action == undefined && optionsKeys.length == 0){
    action = "getAll";
  } else{
    throw Error('Los argumentos ingresados son incorrectos');
  }
  return {results,action};
}

async function main() {
  try{
    const params = await parseaParams(process.argv);
    const mockController = new PelisController();
    let results: Promise<Peli> | Promise<Peli[]> | boolean;
  
    if(params.action == "getAll") results = await mockController.get();
    if(params.action == "get" || params.action == "search") results = await mockController.get(params.results);
    if(params.action == "add") results = await mockController.add(params.results.add);
  
    if(typeof results == 'boolean'){
      (results) ? 
      console.log('La película se añadió correctamente') :
      console.error(`Ya existe una peli con id: ${params.results.add.id}`)
    } else{
      console.log(results)
    }
  }catch (error) {
    throw error;
  }
}

main();
