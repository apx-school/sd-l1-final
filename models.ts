import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
	title: string;
	id: number;
	rating?: number;
	tags: string[];
	añoDeLanzamiento?: number;

	constructor(title: string, id: number, tags: string[], rating?: number, añoDeLanzamiento?: number) {
		this.title = title;
		this.id = id;
		this.rating = rating;
		this.tags = tags;
		this.añoDeLanzamiento = añoDeLanzamiento;
	}
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
	async getAll(): Promise<any> {
		const pelis = await jsonfile.readFile('./pelis.json');
		return pelis;
	}
	async getById(id: number): Promise<Peli> {
		const pelis = await this.getAll();
		return pelis.find((peli) => peli.id == id);
	}
	async search(options: SearchOptions): Promise<Peli[]> {
		const pelis = await this.getAll();
		if (options.title && options.tag) {
			return pelis.filter((peli) => {
				const titleDePeliEnLowerCase = peli['title'].toLowerCase();
				const peliFiltradaByTitle = titleDePeliEnLowerCase.includes(options.title.toLowerCase());
				const tagsDePeliEnLowerCase = peli.tags.map((tag) => tag.toLowerCase());
				const peliFiltradaByTag = tagsDePeliEnLowerCase.includes(options.tag.toLowerCase());
				return peliFiltradaByTitle && peliFiltradaByTag;
			});
		} else {
			if (options.title) {
				return pelis.filter((peli) => {
					const titleDePeliEnLowerCase = peli['title'].toLowerCase();
					const peliFiltradaByTitle = titleDePeliEnLowerCase.includes(options.title.toLowerCase());
					return peliFiltradaByTitle;
				});
			}
			if (options.tag) {
				return pelis.filter((peli) => {
					const tagsDePeliEnLowerCase = peli.tags.map((tag) => tag.toLowerCase());
					const peliFiltradaByTag = tagsDePeliEnLowerCase.includes(options.tag.toLowerCase());
					return peliFiltradaByTag;
				});
			}
		}
	}

	async add(peli: Peli): Promise<Boolean> {
		const idPeliExiste = await this.getById(peli.id);
		if (idPeliExiste) return false;
		else {
			const pelis = await this.getAll();
			pelis.push(peli);
			// habria que mejorar la parte del error
			return jsonfile
				.writeFile('./peli.json', pelis)
				.then(() => {
					console.log('El archivo se escribió correctamente');
					return true;
				})
				.catch((error) => {
					console.error('Error al escribir el archivo:', error);
					return false;
				});
		}
	}
}

export { PelisCollection, Peli };
