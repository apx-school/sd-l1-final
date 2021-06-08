import * as minimist from "minimist";
import {PelisController} from "./controllers"
import {PelisCollection, Peli} from "./models"

function parseaParams(argv) {
  const resultado = minimist(argv);
  delete resultado._;
  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const pelisCollection = new PelisCollection();
  console.log (params);
  // if (params == {}) {
  //   const todasLasPelis = pelisCollection.getAll().then((p)=>{
  //     console.table(p);
  //     return p;
  //   });
  //   };
      
    }
    
    
  
  
// import * as minimist from "minimist";
// import { PelisController } from "./controllers";
// import { Peli } from "./models";
// import { isEmpty } from "lodash";

// function parseaParams(argv) {
//   const resultado = minimist(argv);
//   const peliAgregada = new Peli();
//   if (
//     resultado._.includes("add") &&
//     resultado.id &&
//     resultado.title &&
//     resultado.tag
//   ) {
//     peliAgregada.id = resultado.id;
//     peliAgregada.title = resultado.title;
//     peliAgregada.tag = resultado.tags;
//     return {
//       add: peliAgregada,
//     };
//   } else {
//     if (resultado._.includes("get")) {
//       return {
//         get: { id: resultado._[1] },
//       };
//     } else {
//       if (resultado._.includes("search")) {
//         delete resultado._;
//         return {
//           search: resultado,
//         };
//       } else {
//         if (isEmpty(resultado._)) {
//           return {
//             vacio: 1,
//           };
//         }
//       }
//     }
//   }
// }

// function main() {
//   const params = parseaParams(process.argv.slice(2));
//   const pelisController = new PelisController();
//   console.log (params); 
// //   if (params.add) {
// //     pelisController.add(params.add).then((resultado) => {
// //       return console.log(resultado);
// //     });
// //   }
// //   if (params.get) {
// //     pelisController.get(params.get).then((resultado) => {
// //       return console.log(resultado);
// //     });
// //   }
// //   if (params.search) {
// //     pelisController.get(params).then((resultado) => {
// //       return console.log(resultado);
// //     });
// //   }
// //   if (params.vacio) {
// //     pelisController.get().then((resultado) => {
// //       return console.log(resultado);
// //     });
// //   }
// }
  
main();
