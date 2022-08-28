// LLAMADO A MOD
import { PelisCollection, Peli } from "./models";

// CLASE Y CON
class PelisController {
	peliculas: PelisCollection;
	constructor() {
		this.peliculas = new PelisCollection();
	}
// TIPO
	async get(tipo: any): Promise<any> {
		if (tipo.id) {return await this.peliculas.getById(tipo.id);}
		else if (tipo.search) {return await this.peliculas.search(tipo.search);}
		else if (tipo.empty) {return await this.peliculas.getAll();}
	}
	add(peli: Peli): Promise<boolean> {return this.peliculas.add(peli);}
}
export { PelisController };