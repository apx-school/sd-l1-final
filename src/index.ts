import minimist from "minimist";
import { PelisController } from "./controllers";

const pelisController = new PelisController();

async function parseaParams(argv: string[]) {
	const resultado = minimist(argv);

	return resultado;
}

async function main() {
	const params: any = await parseaParams(process.argv.slice(2));

	if (params._[0] === "add") {
		const peli = {
			id: params.id,
			title: params.title,
			tags: params.tags,
		};

		const addResult = await pelisController.add(peli);
	} else if (params._[0] === "get") {
		let options = {};
		// este es el argumento que sigue a get
		const arg = params._[1];
		if (!isNaN(Number(arg))) {
			// si es un número, lo tratamos como ID
			options = { id: Number(arg) };
		}
		// llamamos al método get del controlador
		const getResult = await pelisController.getOne(options);
		console.log(getResult);
	} else if (params._[0] === "search") {
		const options: { search: { title?: string; tag?: string } } = { search: {} };
		// console.log("Buscando pelis");
		if (params.title) {
			options.search.title = params.title;
		}

		if (params.tag) {
			options.search.tag = params.tag;
		}
		const peliculas = await pelisController.search(options.search);
		console.log("Películas encontradas:", peliculas);
	} else {
		const todasLasPelis = await pelisController.get();
		console.log("Todas las películas: ", todasLasPelis);
	} // else {
	// 	console.log("Comando no reconocido.");
	// }
}

main();
