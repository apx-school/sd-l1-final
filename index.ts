import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
	const resultado = minimist(argv);
	if (resultado == "add") {
		return { resultado };
	} else {
		return resultado;
	}
}
function main() {
	const params = parseaParams(process.argv.slice(2));
	const controller = new PelisController();
	controller.get(params).then((res) => {
		console.log(res);
	});
}

main();
