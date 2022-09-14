import * as minimist from "minimist";
import {PelisController  } from "./controllers";
function parseaParams(argv) {
	const resultado = minimist(argv);
	const newPeli = new PelisController();
	const accion = resultado._;
	const parametro = accion[0];
	if (parametro === 'get') return newPeli.get({ id: accion[1] });
	else if (parametro === 'search') return newPeli.get({ search: resultado });
	else if (parametro === 'add') {
		const peli = {
			id: resultado.id,
			title: resultado.title,
			tags: resultado.tags,
		};
		return newPeli.add(peli);
	}
	return newPeli.get({});
}

async function main() {
	const param = process.argv.slice(2);
	const res = await parseaParams(param);
	console.log(res);
}

main();
