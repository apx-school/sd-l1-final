import * as minimist from "minimist";
import { PelisController } from "./controllers"

function parseaParams(argv) {
  return minimist(argv);
}

function main() {
  const test = new PelisController( );
  var params = parseaParams( process.argv.slice(2) );
  const command = params._[0];
  var param1 = params._[1];
  delete params._

  if( command == 'add' ){
    test.add( params ).then( ( resultado ) => {
      console.log( resultado );           
    } );
  } else {
    if( command == 'get' ){
      params = { id : param1 };
    }
    else{
      if( command == 'search' ){
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