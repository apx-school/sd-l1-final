/** @format */

import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv) {
	const resultado = minimist(argv);
	if (resultado._[0] == 'search' && resultado.title && resultado.tag) {
		return { search: { title: resultado.title, tag: resultado.tag } };
	} else if (resultado._[0] == 'search' && resultado.title) {
		return { search: { title: resultado.title } };
	} else if (resultado._[0] == 'search' && resultado.tag) {
		return { search: { tag: resultado.tag } };
	} else if (resultado._[0] == 'get') {
		return { id: resultado._[1] };
	} else if (resultado._[0] == 'add') {
		return {
			id: resultado.id,
			title: resultado.title,
			tags: resultado.tags,
		};
	} else {
		return {};
	}
}

function opcionesParametros(params) {
	let constroller = new PelisController();
	if (params.id && params.title && params.tags) {
		return constroller.add(params).then((resultado) => {
			console.log(resultado);
			//return resultado;
		});
	} else if (params.search || params.id) {
		return constroller.get(params).then((resultado) => {
			console.log(resultado);
			//return resultado;
		});
	} else {
		return constroller.get({}).then((resultado) => {
			console.log(resultado);
			//return resultado;
		});
	}
}
function main() {
	const params = parseaParams(process.argv.slice(2));
	opcionesParametros(params);
}

main();
