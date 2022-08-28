import * as jsonfile from "jsonfile";
// FORMATO
class Peli {
	id: number;
	title: string;
	tags: string[];
}
// MI COLECCION Y FILTROS
class PelisCollection {
	peliculas: Peli[];
	async getAll(): Promise<Peli[]> {
		const mispelis = await jsonfile.readFile(__dirname + "/pelis.json");
		return (this.peliculas = mispelis);
	}
  // FILTROS POR ID 'GET'
	async getById(id: number): Promise<Peli> {
		await this.getAll();
		const peliculaConId = this.peliculas.find((pel) => pel.id == id);
		return peliculaConId;
	}
  // FILTRO POR SEARCH TITULO O TAGS
	async search(referencia: any): Promise<Peli[]> {
		await this.getAll();
		if (referencia.title && referencia.tag) {
			return this.peliculas.filter((pel) => {
				return (
					pel.title.includes(referencia.title) &&
					pel.tags.includes(referencia.tag)
				);
			});
		}
	else if (referencia.title) {
			return this.peliculas.filter((pel) => {
				return pel.title.includes(referencia.title);
			});
		}
	else if (referencia.tag) {
			return this.peliculas.filter((pel) => {
				return pel.tags.includes(referencia.tag);
			});
		}
	}
  // AGREGA PELICULA NUEVA
	async add(peli: Peli): Promise<boolean> {
		const promesaUno = this.getById(peli.id).then((peliExistente) => {
			if (peliExistente) {
				return false;
			} else {
				return this.getAll().then((peliculas) => {
					peliculas.push(peli);
					const promesaDos = jsonfile.writeFile("./pelis.json",peliculas
					);
					return promesaDos.then(() => {return true;	});
				});}});
		return promesaUno;}
}
export { PelisCollection, Peli };