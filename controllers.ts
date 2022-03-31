import { PelisCollection, Peli } from './models';

class PelisController {
	pelisCollection: PelisCollection;

	constructor() {
		this.pelisCollection = new PelisCollection();
	}

	get(options): Promise<any> {
		if (options.id) {
			return this.pelisCollection.getById(options.id);
		} else if (options.search) {
			return this.pelisCollection.search(options.search);
		} else {
			return this.pelisCollection.getAll();
		}
	}

	add(peli: Peli) {
		return this.pelisCollection.add(peli);
	}
}

export { PelisController };
