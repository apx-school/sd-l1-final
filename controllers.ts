import { PelisCollection, Peli } from "./models";

class PelisController {
	pelis: PelisCollection;
	constructor() {
		this.pelis = new PelisCollection();
	}
	get(option: any) {
		this.pelis.getById(option.params.id);
	}
	search(option: any) {
		this.pelis.search(option.search);
	}
	add(peli: Peli) {
		return this.pelis.add(peli);
	}
}
export { PelisController };
