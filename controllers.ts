import { PelisCollection, Peli } from "./models";

class PelisController {
	peliculas: PelisCollection;
	constructor() {
		this.peliculas = new PelisCollection();
	}

	async get(options: any): Promise<any> {
		if (options.id) {
			return this.peliculas.getById(options.id);
		} else if (options.search) {
			return this.peliculas.search(options.search);
		} else {
			return await this.peliculas.getAll();
		}
	}

	add(peli: Peli): Promise<boolean> {
		return this.peliculas.add(peli);
	}
}
export { PelisController };
