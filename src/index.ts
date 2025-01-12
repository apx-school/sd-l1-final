const minimist = require('minimist'); 
import { Peli, PelisCollection } from './models'; 
import { PelisController } from './controllers'; 


function parseaParams(argv , controladorDeParametros: PelisController) {
  const resultado = minimist(argv); 
  return controladorDeParametros.get ({id: resultado.id}); 
}

async function main() {
  const controladorDeParametros = new PelisController();
  try{ 
  const params = await parseaParams(process.argv.slice(2), controladorDeParametros);
  console.log(params);
  }
  catch (error){
    console.error ("Error al procesar parametros", error); 
  }
}

main();
