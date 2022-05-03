import * as minimist from "minimist";
import { PelisController } from "./controllers";

const PARSEA_PARAMS = (argv) => minimist(argv);

const processOptions = (PARAMS) => {
    
    const CONTROLLER = new PelisController();

    if(PARAMS._[0] == "get") {

        return CONTROLLER.get({ id: PARAMS._[1] });

    } else if(PARAMS._[0] == "search") {

        if(PARAMS.title && PARAMS.tag) {

            return CONTROLLER.get({ search: { title: PARAMS.title, tags: PARAMS.tags } });

        } else if(PARAMS.title) {

            return CONTROLLER.get({ search: { title: PARAMS.title } });

        } else if(PARAMS.tag) {

            return CONTROLLER.get({ search: { tag: PARAMS.tag } });
        }

    } else if(PARAMS._[0] == "add") {

        return CONTROLLER.add({ id: PARAMS.id, title: PARAMS.title, tags: PARAMS.tags });

    } else {

        return CONTROLLER.peliculas.getAll();
    }
}

function main() {

    const PARAMS = PARSEA_PARAMS(process.argv.slice(2));

    processOptions(PARAMS).then( (res) => console.log(res) );

}

main();
