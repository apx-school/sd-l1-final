import { PelisCollection, Peli } from './models';

type Options = {
	id?: number;
	search?: {
		title?: string;
		tag?: string;
	};
};

class PelisController {
	pelis: PelisCollection;

	constructor() {
		this.pelis = new PelisCollection();
	}

	get(options?: Options): Promise<any> {
		if (options.id) return this.pelis.getById(options.id);
		if (options.search) return this.pelis.search(options.search);
		return this.pelis.getAll();
	}

	add(peli: Peli): Promise<Boolean> {
		return this.pelis.add(peli);
	}
}

export { PelisController, Options };
