import * as minimist from "minimist";
import { PelisController } from "./controllers";

const PARSEA_PARAMS = (argv) => minimist(argv);

const OBJETO_OPCIONES = (PARAMS) => {

    if(PARAMS._[0] == "get") {

        return { id: PARAMS._[1] };

    } else if(PARAMS._[0] == "search") {

        if(PARAMS.title && PARAMS.tag) {

            return { search: { title: PARAMS.title, tag: PARAMS.tag } };

        } else if(PARAMS.title) {

            return { search: { title: PARAMS.title } };

        } else if(PARAMS.tag) {

            return { search: { tag: PARAMS.tag } };
        }

    } else if(PARAMS._[0] == "add") {

        return { add: { id: PARAMS.id, title: PARAMS.title, tags: PARAMS.tags } }

    } else {

        return {};
    }
}

function main() {

    const OBJ_PARAMS = OBJETO_OPCIONES(PARSEA_PARAMS(process.argv.slice(2)));

    const CONTROLLER = new PelisController();

    if(OBJ_PARAMS.id || OBJ_PARAMS.search) {

        return CONTROLLER.get(OBJ_PARAMS).then( res => console.log(res) ) ;

    } else if(OBJ_PARAMS.add) {

        return CONTROLLER.add(OBJ_PARAMS).then( res => console.log(res) ) ;

    } else {

        return CONTROLLER.get(OBJ_PARAMS).then( res => console.log(res) ) ;
    }
}

main();
