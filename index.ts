import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv) {
    const resultado = minimist(argv);

    return resultado;
}

function main() {
    const params = parseaParams(process.argv.slice(2));
    const aEjecutar = params._[0];
    const controller = new PelisController();
    //console.log(params);
    if (aEjecutar == 'add') {
        controller.add(params).then((rta) => {
            console.log(rta);
        });
    } else if (aEjecutar == 'get') {
        const obj = { id: params._[1] };
        controller.get(obj).then((rta) => {
            console.log(rta);
        });
    } else if (aEjecutar == 'search') {
        const obj = {
            search: {
                title: params.title,
                tag: params.tag,
            },
        };
        //aEjecutar == 'search'
        //console.log('entre a get(params)');
        controller.get(obj).then((rta) => {
            console.log(rta);
        });
    } else {
        const obj = {};
        controller.get(obj).then((rta) => {
            console.log(rta);
        });
    }
}

main();
