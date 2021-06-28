import { PelisCollection, Peli } from "./models";

class PelisController {
	pelis: PelisCollection;
	constructor() {
		this.pelis = new PelisCollection();
	}
	get(options: any): Promise<any> {
		if (options.id) {
			return this.pelis.getById(options.id).then((r) => {
				return r;
			});
		} else if (options.search) {
			return this.pelis.search(options.search).then((r) => {
				return r;
			});
		} else {
			return this.pelis.getAll().then((r) => {
				return r;
			});
		}
	}
	add(peli: Peli) {
		return this.pelis.add(peli).then((r) => {
			return r;
		});
	}
}
export { PelisController };
