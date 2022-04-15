import { PelisCollection, Peli } from "./models";

class PelisController {
	data: PelisCollection;
	constructor() {
		this.data = new PelisCollection();
	}
	get(options) {
		if (options.id) {
			return this.data.getById(options.id).then((p) => {
				return p;
			});
		} else if (options.search) {
			return this.data.search(options.search).then((p) => {
				return p;
			});
		} else {
			return this.data.getAll().then((p) => {
				return p;
			});
		}
	}
	add(peli: Peli) {
		return this.data.add(peli).then((p) => {
			return p;
		});
	}
}
export { PelisController };
