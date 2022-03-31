import * as minimist from 'minimist';
import { PelisController } from './controllers';

function parseaParams(argv) {
	const resultado = minimist(argv);
	const newPelisController = new PelisController();
	const accion = resultado._;
	const parametro = accion[0];
	if (parametro === 'get') return newPelisController.get({ id: accion[1] });
	else if (parametro === 'search') return newPelisController.get({ search: resultado });
	else if (parametro === 'add') {
		const nuevaPeli = {
			id: resultado.id,
			title: resultado.title,
			tags: resultado.tags,
		};
		return newPelisController.add(nuevaPeli);
	}
	return newPelisController.get({});
}

async function main() {
	const parametros = process.argv.slice(2);
	const resultadoFinal = await parseaParams(parametros);
	console.log(resultadoFinal);
}

main();
