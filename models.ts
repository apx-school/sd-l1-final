import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
	id: number;
	title: string;
	tags: string[];
}

class PelisCollection {
	peliculas: Peli[];
	async getAll(): Promise<Peli[]> {
		const json = await jsonfile.readFile(__dirname + "/pelis.json");
		return (this.peliculas = json);
	}

	async getById(id: number): Promise<Peli> {
		await this.getAll();
		const peliculaConId = this.peliculas.find((pel) => pel.id == id);
		return peliculaConId;
	}

	async search(options: any): Promise<Peli[]> {
		await this.getAll();
		if (options.title && options.tag) {
			return this.peliculas.filter((pel) => {
				return (
					pel.title.includes(options.title) &&
					pel.tags.includes(options.tag)
				);
			});
		}
		if (options.title) {
			return this.peliculas.filter((pel) => {
				return pel.title.includes(options.title);
			});
		}
		if (options.tag) {
			return this.peliculas.filter((pel) => {
				return pel.tags.includes(options.tag);
			});
		}
	}

	async add(peli: Peli): Promise<boolean> {
		const promesaUno = this.getById(peli.id).then((peliExistente) => {
			if (peliExistente) {
				return false;
			} else {
				return this.getAll().then((peliculas) => {
					peliculas.push(peli);
					const promesaDos = jsonfile.writeFile(
						"./pelis.json",
						peliculas
					);
					return promesaDos.then(() => {
						return true;
					});
				});
			}
		});
		return promesaUno;
	}
}

export { PelisCollection, Peli };