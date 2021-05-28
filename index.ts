import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
    const resultado = minimist(argv);

    return resultado;
}
//funcion que conecta los argumentos con el modulo controllers

function opcionesDeParametros(params, controller) {
    var resultadoFinal;

    if (params._[0] == ["add"]) {
        const objeto = {
            id: params.id,
            title: params.title,
            tags: params.tags,
        };
        resultadoFinal = controller.add(objeto).then((i) => {
            return i;
        });
    }

    if (params._[0] == ["get"]) {
        const obj = { id: params._[1] };
        resultadoFinal = controller.get(obj).then((i) => {
            return i;
        });
    }

    if (params._[0] == "search") {
        let objeto = {};
        if (params.title) {
            objeto["title"] = params.title;
        }
        if (params.tag) {
            objeto["tags"] = params.tag;
        }
        resultadoFinal = controller.get({ search: objeto }).then((result) => {
            console.log({ search: objeto });
            return result;
        });
    }

    if (params._.length == 0) {
        resultadoFinal = controller.get({}).then((result) => {
            return result;
        });
    }
    return resultadoFinal;
}

function main() {
    const controller = new PelisController();
    const params = parseaParams(process.argv.slice(2));
    opcionesDeParametros(params, controller).then((res) => {
        console.log(res);
    });
}

main();
