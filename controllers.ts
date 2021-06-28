import { PelisCollection, Peli } from "./models";

class PelisController {
	pelis: PelisCollection;
	constructor() {
		this.pelis = new PelisCollection();
	}
	get(options: any): Promise<any> {
		if (options.id) {
			return this.pelis.getById(options.id).then((res) => {
				return res;
			});
		} else if (options.search) {
			return this.pelis.search(options.search).then((res) => {
				return res;
			});
		} else {
			return this.pelis.getAll().then((res) => {
				return res;
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
