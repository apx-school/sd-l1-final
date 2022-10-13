import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
	const resultado = minimist(argv);
	return resultado;
}

async function pars(argumentos) {
	const clase = new PelisController();
	if (argumentos._[0] == "add") {
		return await clase
			.add({
				id: argumentos.id,
				title: argumentos.title,
				tags: argumentos.tags,
			})
			.then((respuesta) => {
				return respuesta;
			});
	}
	if (argumentos._[0] == "get") {
		return clase.get({ id: argumentos._[1] });
	}
	if (argumentos._[0] == "search") {
		return clase.get({
			search: { title: argumentos.title, tag: argumentos.tag },
		});
	}
	if (_.isEmpty(argumentos._[0])) {
		return clase.get({ empty: "empty" });
	}
}
function main() {
	const params = parseaParams(process.argv.slice(2));
	return pars(params).then((x) => {
		console.log(x);
		return x;
	});
}

main();
