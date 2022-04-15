import * as minimist from "minimist";
import { PelisController } from "./controllers"

function parseaParams(argv) {
  return minimist(argv);
}

function main() {
  const test = new PelisController( );
  var params = parseaParams( process.argv.slice(2) );

  if( params._[0] == 'add' ){
    delete params._
    test.add( params ).then( ( resultado ) => {
      console.log( resultado );           
    } );
  } else {
    if( params._[0] == 'get' ){
      params = { id : params._[1] };
    }
    else{
      if( params._[0] == 'search' ){
        delete params._
        params = { search : params }
      }
      else{
        params = undefined;
      }
    }
    test.get(params).then( ( resultado ) => {
    console.log(resultado);           
    } );
  }
}

main();