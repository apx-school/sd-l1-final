import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
	const resultado = minimist(argv);
	return resultado;
}
function addOrGet(opcion) {
	const controller = new PelisController();
	if (opcion._[0] == "search") {
		controller
			.get({ search: { title: opcion.title, tag: opcion.tag } })
			.then((res) => {
				console.log(res);
			});
	} else if (opcion._[0] == "search" && opcion.title) {
		controller.get({ search: { title: opcion.title } });
	} else if (opcion._[0] == "search" && opcion.tags) {
		controller.get({ search: { title: opcion.tags } });
	} else if (opcion._[0] == "get") {
		controller.get({ id: opcion._[1] }).then((res) => {
			console.log(res);
		});
	} else if (opcion._[0] == "add") {
		console.log("La pelicula:", opcion.title, "a sido agregada a la lista");
		controller.add(opcion);
	} else {
		controller.pelis.getAll().then((res) => {
			console.log(res);
		});
	}
}

function main() {
	const params = parseaParams(process.argv.slice(2));
	addOrGet(params);
}

main();
