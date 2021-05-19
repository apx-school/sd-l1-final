import * as minimist from "minimist";
import{PelisController} from "./controllers"

function parseaParams(argv) {
  const resultMin = minimist(argv);
  if(resultMin.get){
    return{ get: resultMin.get}
  }else{
    return{};
  }
  
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