import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
	const resultado = minimist(argv);
	if (resultado._[0] == "add") {
		return {
			add: { id: resultado.id, title: resultado.title, tags: resultado.tags },
		};
	} else if (resultado._[0] == "search" && resultado.title && resultado.tag) {
		return {
			search: { title: resultado.title, tag: resultado.tag },
		};
	} else if (resultado._[0] == "search" && resultado.title) {
		return { search: { title: resultado.title } };
	} else if (resultado._[0] == "search" && resultado.tag) {
		return { search: { tag: resultado.tag } };
	} else if (resultado._[0] == "get") {
		return { id: resultado._[1] };
	} else {
		return resultado;
	}
}
function addOrGet(opcion) {
	const controller = new PelisController();
	if (opcion.add) {
		controller.add(opcion.add).then((r) => {
			console.log(r);
			return r;
		});
	} else if (opcion.get) {
		controller.get(opcion).then((r) => {
			console.log(r);
			return r;
		});
	}
}

function main() {
	const params = parseaParams(process.argv.slice(2));
	const opcion = addOrGet(params);
}

main();
