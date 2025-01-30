import minimist from "minimist";
import { PelisController, Options } from "./controllers";
import { get } from "lodash";
import { Peli } from "./models";

function parseaParams(argv: string[]) {
    const resultado = minimist(argv);
    return resultado;
}

async function main() {
    const controller = new PelisController();
    const params = parseaParams(process.argv.slice(2));
    const action = params._[0];

    let result: Peli | Peli[];
    if (!action) {
        result = await controller.model.getAll();
    } else if (action === "add") {
        const peli = {
            id: params.id,
            title: params.title,
            tags: params.tags,
            year: 0,
        };
        await controller.add(peli);
    } else if (action === "get") {
        // tuve que parsear el id ya que ts me decía que era un string
        const resultId = params._[1];
        console.log(params);

        result = await controller.getOne({ id: parseInt(resultId) });
    } else if (action === "search") {
        const peli: Options = {
            search: {
                title: params.title,
                tag: params.tag,
            },
        };
        result = await controller.get(peli);
    }

    console.log(result);
    return result;
}

main();
