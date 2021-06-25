import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
    const resultado = minimist(argv);
    const accion = resultado._[0];
    // return resultado;
    if (accion == "add") {
        return {
            [accion]: {
                id: resultado.id,
                title: resultado.title,
                tags: resultado.tags,
            },
        };
    } else if (accion == "get") {
        return { [accion]: { id: resultado._[1] } };
    } else if (accion == "search") {
        return { [accion]: { title: resultado.title, tag: resultado.tag } };
    } else if (accion == undefined) {
        return true;
    }
}

function ejecutador(argumentos) {
    const controlador = new PelisController();
    // return argumentos;
    if (argumentos.add) {
        return controlador.add(argumentos.add);
    } else if (argumentos.get) {
        return controlador.get(argumentos.get);
    } else if (argumentos.search) {
        return controlador.get(argumentos);
    } else if (argumentos === true) {
        return controlador.get(argumentos);
    }
}

function main() {
    const params = parseaParams(process.argv.slice(2));
    ejecutador(params).then((res) => {
        console.log(res);
    });
}

main();
