import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
	const controller = new PelisController();
	const resultado = minimist(argv);
	if (resultado._[0] == "add") {
		return controller.add({
			id: resultado.id,
			title: resultado.title,
			tags: resultado.tags,
		});
	} else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
		return { search: { title: resultado.title, tag: resultado.tag } };
	} else if (resultado._[0] == "search" && resultado.title) {
		return { search: { title: resultado.title } };
	} else if (resultado._[0] == "search" && resultado.tag) {
		return { search: { tag: resultado.tag } };
	} else if (resultado._[0] == "get") {
		return { id: resultado._[1] };
	} else {
		return controller.pelis.getAll();
	}
}

function main() {
	const params = parseaParams(process.argv.slice(2));
	const parseados = parseaParams(params);
	console.log(parseados);
}

main();
