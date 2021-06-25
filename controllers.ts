import { PelisCollection, Peli } from "./models";

class PelisController {
	pelis: PelisCollection;
	constructor() {
		this.pelis = new PelisCollection();
	}
	get(option: any) {
		let resultado;
		if (option.id) {
			resultado = this.pelis.getById(option.params.id);
		} else if (option.search) {
			resultado = this.pelis.search(option.search);
		} else if (option.add) {
			resultado = this.pelis.add(option.id);
		}
	}
	add(peli: Peli) {
		return this.pelis.add(peli);
	}
}
export { PelisController };
