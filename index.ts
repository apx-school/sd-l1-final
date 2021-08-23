import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
	const result = minimist(argv);
	if (result._[0] == "get") {
		return { id: result._[1] };
	} else if (result._[0] == "search") {
		if (result.tag && result.title) {
			return { search: { title: result.title, tag: result.tag } };
		} else if (result.tag) {
			return { search: { tag: result.tag } };
		} else if (result.title) {
			return { search: { title: result.title } };
		}
	} else if (result._[0] == "add") {
		return { id: result.id, title: result.title, tags: result.tags };
	} else {
		return {};
	}
}
function pasaParametros(params) {
	const controller = new PelisController();
	if (params.id && params.title && params.tags) {
		return controller.add(params).then((p) => {
			console.log(p);
		});
	} else if (params.id) {
		return controller.get(params).then((p) => {
			console.log(p);
		});
	} else if (params.search) {
		return controller.get(params).then((p) => {
			console.log(p);
		});
	} else {
		return controller.get(params).then((p) => {
			console.log(p);
		});
	}
}
function main() {
	const params = parseaParams(process.argv.slice(2));
	pasaParametros(params);
}

main();
