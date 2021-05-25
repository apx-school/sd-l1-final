import * as minimist from "minimist";
import{PelisController} from "./controllers"

function parseaParams(argv) {
  const resultMin = minimist(argv);
  if(resultMin._[0]=="get"){
    
    return{ get: resultMin._[1]}
  
  }else if(resultMin._[0]=="search"){
    
    let object = {};
    
    if(resultMin.title){
      object = {
        title:resultMin.title
      };
    }
  }
    return{};
}


function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params)
  const movController = new PelisController();
  movController.processOptions(params).then((result)=>{
    console.table(result);
  });
}

main(); 