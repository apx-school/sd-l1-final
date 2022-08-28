// INVOCAR RE
import * as _ from "lodash";
import * as minimist from "minimist";
import { PelisController } from "./controllers";

// FUNCION DE PARCEOS
function parseaParams(argv) {
	const resultado = minimist(argv);
	return resultado;
}
// FILTROS
async function processOptions(args) {
	const datos = new PelisController();
	if (args._[0] == "add") {
		return await datos
			.add({
				id: args.id,
				title: args.title,
				tags: args.tags,
			})
			.then((res) => {return res;});}
	if (args._[0] == "get") {return datos.get({ id: args._[1] });}
	if (args._[0] == "search") {
		return datos.get({ search: { title: args.title, tag: args.tag },	});
	}
	if (_.isEmpty(args._[0])) {return datos.get({ empty: "empty" });}
}

// FUNCION INICIAL
function main() {
	const params = parseaParams(process.argv.slice(2));
	console.log(params);
	return processOptions(params).then((res) => {
		console.log(res);
		return res;
	});
}

main();