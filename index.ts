import { PelisController } from './controllers';
import * as minimist from 'minimist';

function parseaParams(argv) {
	const controller = new PelisController();
	const resultado = minimist(argv);
	const accion = resultado._[0];

	if (accion === 'get') return controller.get({ id: resultado._[1] });
	if (accion === 'add') {
		return controller.add({
			id: resultado.id,
			rating: resultado.rating,
			title: resultado.title,
			tags: resultado.tag,
			añoDeLanzamiento: resultado.añoDeLanzamiento,
		});
	}
	if (accion === 'search') return controller.get({ search: resultado });
	else return controller.pelis.getAll();
}

async function main() {
	const params = await parseaParams(process.argv.slice(2));
	console.log(params);
}
main();
