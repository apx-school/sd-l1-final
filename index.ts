import * as minimist from "minimist";
import { PelisController } from "./controllers";

function comandosAEjecutar(parametros) {
   const controller = new PelisController();
   if (parametros.id && parametros.title && parametros.tags) {
      return controller.add(parametros).then((resultado) => {
         console.log(resultado);
      });
   } else if (parametros.search || parametros.id) {
      return controller.get(parametros).then((resultado) => {
         console.log(resultado);
      });
   } else {
      return controller.get({}).then((resultado) => {
         console.log(resultado);
      });
   }
}

function parseaParams(argv) {
   const resultado = minimist(argv);
   if (resultado._[0] == "search" && resultado.title && resultado.tag) {
      return { search: { title: resultado.title, tag: resultado.tag } };
   } else if (resultado._[0] == "search" && resultado.title) {
      return { search: { title: resultado.title } };
   } else if (resultado._[0] == "search" && resultado.tag) {
      return { search: { tag: resultado.tag } };
   } else if (resultado._[0] == "get") {
      return { id: resultado._[1] };
   } else if (resultado._[0] == "add") {
      return {
         id: resultado.id,
         title: resultado.title,
         tags: resultado.tags,
      };
   } else {
      return {};
   }
}

function main() {
   const params = parseaParams(process.argv.slice(2));
   const resultado = comandosAEjecutar(params);
   console.log(resultado);
}

main();
