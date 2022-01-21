import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
	id: number;
	title: string;
	tags: string[];
}

class PelisCollection {
	async getAll(): Promise<Peli[]> {
		const json = await jsonfile.readFile("./pelis.json");
		return json;
	}

	async getById(id: number): Promise<Peli> {
		const peliculas = await this.getAll();
		const peliculaConId = peliculas.find((pel) => pel.id == id);
		return peliculaConId;
	}

	async search(options: any): Promise<Peli[]> {
		const peliculas = await this.getAll();

		if (options.title && options.tag) {
			return peliculas.filter((pel) => {
				return (
					pel.title.includes(options.title) &&
					pel.tags.includes(options.tag)
				);
			});
		} else if (options.title) {
			return peliculas.filter((pel) => {
				return pel.title.includes(options.title);
			});
		} else if (options.tag) {
			return peliculas.filter((pel) => {
				return pel.tags.includes(options.tag);
			});
		}
	}

	add(peli: Peli): Promise<boolean> {
		return this.getAll().then((json) => {
			const promesaUno = this.getById(peli.id).then((peliExistente) => {
				if (peliExistente) {
					return false;
				} else {
					const data = json;
					data.push({
						id: peli.id,
						title: peli.title,
						tags: peli.tags,
					});
					const promesaDos = jsonfile.writeFile("./pelis.json", data);
					promesaDos.then((res) => true);
				}
			});
			return promesaUno;
		});
	}
}

export { PelisCollection, Peli };
