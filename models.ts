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
		const archivo = await jsonfile.readFile(__dirname + "/pelis.json");
		return (this.peliculas = archivo);
	}
	async getById(id: number): Promise<Peli> {
		const pelicula = await this.getAll();
		return pelicula.find((resp) => {
			return resp.id == id;
		});
	}
	async search(option: any): Promise<Peli[]> {
		await this.getAll();
		if (option.title && option.tag) {
			const resultado = this.peliculas.filter((x) => {
				return x.title.includes(option.title) && x.tags.includes(option.tag);
			});
			return resultado;
		}
		if (option.title) {
			const res = this.peliculas.filter((x) => {
				return x.title.includes(option.title);
			});
			return res;
		}
		if (option.tag) {
			const resultadoo = this.peliculas.filter((x) => {
				return x.tags.includes(option.tag);
			});
			return resultadoo;
		}
	}
	async add(peli: Peli): Promise<boolean> {
		const promesaUno = this.getById(peli.id).then((peliExistente) => {
			if (peliExistente) {
				return false;
			} else {
				return this.getAll().then((x) => {
					x.push(peli);
					const promesaDos = jsonfile.writeFile("./pelis.json", x);
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
