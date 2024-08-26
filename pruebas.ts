import { log } from 'console';
import minimist from 'minimist';

const helpMenu = `
Opciones de parámetros
--------------------------------------------
add:....... Agrega una nueva Película,
............................................
get:....... obtiene una pelicula.
            <get {id}> id de tipo numero,
............................................
search:.... [--title="char"]
            title => cualquier caracter
            [--tag="tag"],
            tags => acción, drama, etc
............................................
help:...... [--help] Muestra este Menú.
--------------------------------------------
`;

function parseaParams(argv: string[]) {
   const resultado = minimist(argv);
   if (resultado.help) {
      return { help: resultado.help };
   } else {
      return {};
   }
   // return resultado;
}

function main() {
   const argumentos = process.argv.slice(2);
   const parsedArgs = parseaParams(argumentos);
   parsedArgs.help ? console.log(helpMenu) : '';
}

main();
