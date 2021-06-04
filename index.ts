import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const controller = new PelisController()
  controller.promesa.then(()=>{
    const params = parseaParams(process.argv.slice(2));
    controller.processOptions(params).then((res)=>{
      console.table(res)
    })
  })
  // const params = parseaParams(process.argv.slice(2));
  // console.log(params._.length);
  // console.log(params.length);
  // { _: [] }

}

main();
