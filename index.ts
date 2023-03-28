import * as minimist from "minimist";
import { PelisController } from "./controllers";
function parseaParams(argv:string[]) {
  const resultado = minimist(argv);
  return resultado;
}
const optionsController = async (objeto:any) => {
  const controlador = new PelisController()
  let resultado = await controlador.get()
  if(Object.values(objeto)[0][0] == "get") {
      resultado = await controlador.get({id: Object.values(objeto)[0][1]})
  } else if(Object.values(objeto)[0][0] == "search" && objeto.title && objeto.tag) {
      resultado = await controlador.get({search: {title: objeto.title, tag: objeto.tag}})
  } else if(Object.values(objeto)[0][0] == "search" && objeto.title) {
      resultado = await controlador.get({search: {title: objeto.title}})
  } else if(Object.values(objeto)[0][0] == "search" && objeto.tag) {
      resultado = await controlador.get({search: {tag: objeto.tag}})
  } else if(Object.values(objeto)[0][0] == "add") {
      resultado = await controlador.add({id: objeto.id, title: objeto.title, tags: objeto.tags})
  }
  return resultado
}

async function main() {
  const input = parseaParams(process.argv.slice(2))
    const resultado = await optionsController(input)
    console.log(resultado);
}

main()