import { PelisCollection, Peli } from "./models";

class PelisController {
	pelis: PelisCollection;
	constructor() {
		this.pelis = new PelisCollection();
	}
	get(options: any): Promise<any> {
		var respuesta;
		if (options.id) {
			respuesta = this.pelis.getById(options);
		} else if (options.search) {
			respuesta = this.pelis.search(options);
		} else {
			respuesta = this.pelis.getAll();
		}
		return respuesta;
	}
	add(peli: Peli) {
		this.pelis.add(peli);
	}
}
export { PelisController };
