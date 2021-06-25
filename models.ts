import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
	id: number;
	title: string;
	tags: string[];
}

class PelisCollection {
	pelis: Peli[] = [];
	getAll(): Promise<Peli[]> {
		return jsonfile.readFile("./pelis.json").then((p) => {
			// la respuesta de la promesa
			return p;
		});
	}
	getById(id: number) {
		return this.getAll().then((pelis) => {
			const resultado = pelis.find((p) => {
				return p.id == id;
			});
			return resultado;
		});
	}
	search(option: any) {
		return this.getAll().then((peliculas) => {
			if (option.title) {
				const filtradoPorTitulo = peliculas.filter((p) => {
					return peliculas["title"].toLowerCase().includes(option.title);
				});
				return filtradoPorTitulo;
			} else if (option.tags) {
				const filtradoPortags = peliculas.filter((p) => {
					return p.tags == option.tags;
				});
				return filtradoPortags;
			} else if (option.tags && option.title) {
				const filtradoPorTitulo = peliculas.filter((p) => {
					return peliculas["title"].toLowerCase().includes(option.title);
				});
				const filtradoPortags = filtradoPorTitulo.filter((p) => {
					return p.tags == option.tags;
				});
				return filtradoPortags;
			}
		});
	}

	add(peli: Peli): Promise<boolean> {
		const promesaUno = this.getById(peli.id).then((peliExistente) => {
			if (peliExistente) {
				console.log("ya existe la pelicula:", peliExistente);
				return false;
			} else {
				// magia que agrega la pelicula a un objeto data
				return this.getAll().then((p) => {
					p.push(peli);
					return jsonfile.writeFile("./pelis.json", p);
				});
			}
		});
		return promesaUno;
	}
}
export { PelisCollection, Peli };
